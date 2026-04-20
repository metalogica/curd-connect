// Brand type utility: nominally-typed primitives.
//
// Usage:
//   export type UserId = Brand<string, "UserId">;
//   export function asUserId(raw: string): UserId {
//     return raw as UserId;
//   }
//
// Prevents accidentally passing a string where a UserId is expected.

export type Brand<K, T> = K & { readonly __brand: T };

export type UserId = Brand<string, "UserId">;
export type PoutineStoreId = Brand<string, "PoutineStoreId">;
export type ReviewId = Brand<string, "ReviewId">;
export type EpochMs = Brand<number, "EpochMs">;

export const asUserId = (raw: string): UserId => raw as UserId;
export const asPoutineStoreId = (raw: string): PoutineStoreId => raw as PoutineStoreId;
export const asReviewId = (raw: string): ReviewId => raw as ReviewId;
export const asEpochMs = (raw: number): EpochMs => raw as EpochMs;
