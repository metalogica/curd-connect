import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AuthGuard } from "@/components/layout/AuthGuard";

export const Route = createFileRoute("/_authenticated")({
  component: () => (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  ),
});
