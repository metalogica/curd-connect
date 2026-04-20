import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

export function useMe() {
  const me = useQuery(api.users.getMe);
  return { me: me ?? null, isLoading: me === undefined };
}
