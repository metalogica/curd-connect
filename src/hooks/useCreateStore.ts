import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { parseGalleryInput } from "@domain/gallery-urls";
import type { CreateStoreFormValues } from "@/components/stores/CreateStoreForm";

export function useCreateStore() {
  const createStore = useMutation(api.stores.createStore);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(
    values: CreateStoreFormValues,
  ): Promise<Id<"stores"> | null> {
    setError(null);

    const urlsResult = parseGalleryInput({ raw: values.galleryInput });
    if (urlsResult.isErr()) {
      setError("One of the gallery URLs is invalid.");
      return null;
    }

    setIsSubmitting(true);
    try {
      return await createStore({
        name: values.name,
        address: values.address,
        neighbourhood: values.neighbourhood,
        description: values.description,
        gallery: urlsResult.value.map((u) => u.value),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }

  return { submit, isSubmitting, error };
}
