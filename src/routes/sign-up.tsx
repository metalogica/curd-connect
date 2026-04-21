import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "@clerk/clerk-react";

function SignUpPage() {
  return (
    <div className="flex items-center justify-center py-8">
      <SignUp signInUrl="/sign-in" />
    </div>
  );
}

export const Route = createFileRoute("/sign-up")({
  component: SignUpPage,
});
