import type { EpochMs } from "@domain/shared/types";

export function compareByCreatedAtDesc<T extends { readonly createdAt: EpochMs }>(
  a: T,
  b: T,
): number {
  return b.createdAt - a.createdAt;
}
