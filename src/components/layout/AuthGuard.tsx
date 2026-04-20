import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function AuthGuard({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] font-mono uppercase tracking-widest text-sm">
        Chargement…
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
}
