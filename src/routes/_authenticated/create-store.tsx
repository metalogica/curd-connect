import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CreateStoreForm } from "@/components/stores/CreateStoreForm";
import { useCreateStore } from "@/hooks/useCreateStore";

function CreateStorePage() {
  const navigate = useNavigate();
  const { submit, isSubmitting, error } = useCreateStore();

  return (
    <CreateStoreForm
      isSubmitting={isSubmitting}
      error={error}
      onSubmit={async (values) => {
        const id = await submit(values);
        if (id) await navigate({ to: "/" });
      }}
    />
  );
}

export const Route = createFileRoute("/_authenticated/create-store")({
  component: CreateStorePage,
});
