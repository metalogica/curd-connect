export type DomainError =
  | { readonly _tag: "ValidationError"; readonly field: string; readonly reason: string }
  | { readonly _tag: "NotFoundError"; readonly resource: string; readonly id: string }
  | { readonly _tag: "InvariantViolation"; readonly invariant: string };

export const validationError = (field: string, reason: string): DomainError => ({
  _tag: "ValidationError",
  field,
  reason,
});

export const notFoundError = (resource: string, id: string): DomainError => ({
  _tag: "NotFoundError",
  resource,
  id,
});

export const invariantViolation = (invariant: string): DomainError => ({
  _tag: "InvariantViolation",
  invariant,
});
