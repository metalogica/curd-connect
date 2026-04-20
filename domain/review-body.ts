import { ok, err, type Result } from "@domain/shared/result";
import { validationError, type DomainError } from "@domain/shared/errors";

export const MAX_REVIEW_BODY_LEN = 2000;

export class ReviewBody {
  private constructor(public readonly value: string) {}

  static parse({ raw }: { raw: string }): Result<ReviewBody, DomainError> {
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      return err(validationError("body", "empty"));
    }
    if (trimmed.length > MAX_REVIEW_BODY_LEN) {
      return err(validationError("body", "too_long"));
    }
    return ok(new ReviewBody(trimmed));
  }
}
