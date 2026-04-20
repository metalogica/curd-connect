import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Webhook } from "svix";

const http = httpRouter();

type ClerkUserPayload = {
  id: string;
  email_addresses: Array<{ email_address: string }>;
  username: string | null;
  first_name: string | null;
  image_url: string;
};

type ClerkWebhookEvent = {
  type: "user.created" | "user.updated" | "user.deleted" | string;
  data: ClerkUserPayload;
};

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    if (!secret) {
      return new Response("CLERK_WEBHOOK_SECRET not configured", { status: 500 });
    }

    const svixId = request.headers.get("svix-id");
    const svixTimestamp = request.headers.get("svix-timestamp");
    const svixSignature = request.headers.get("svix-signature");
    if (!svixId || !svixTimestamp || !svixSignature) {
      return new Response("Missing svix headers", { status: 400 });
    }

    const rawBody = await request.text();
    const wh = new Webhook(secret);

    let event: ClerkWebhookEvent;
    try {
      event = wh.verify(rawBody, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      }) as ClerkWebhookEvent;
    } catch {
      return new Response("Invalid signature", { status: 400 });
    }

    if (event.type === "user.created" || event.type === "user.updated") {
      const data = event.data;
      const email = data.email_addresses[0]?.email_address ?? "";
      const rawHandle = data.username ?? data.first_name ?? data.id;

      await ctx.runMutation(internal.users.upsertFromClerk, {
        clerkId: data.id,
        email,
        rawHandle,
        avatarUrl: data.image_url,
      });
    }

    return new Response(null, { status: 200 });
  }),
});

export default http;
