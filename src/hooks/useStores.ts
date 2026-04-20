import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

export function useStores() {
  const stores = useQuery(api.stores.listPublicStores, {});
  return { stores: stores ?? [], isLoading: stores === undefined };
}
