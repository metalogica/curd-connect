import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
  return (
    <div className="flex items-center justify-center py-8">
      <SignIn signUpUrl="/sign-up" />
    </div>
  );
}

export const Route = createFileRoute("/sign-in")({
  component: SignInPage,
});
