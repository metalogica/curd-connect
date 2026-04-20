import { ok, err, type Result } from "@domain/shared/result";
import { validationError, type DomainError } from "@domain/shared/errors";

export type RatingValue = 1 | 2 | 3 | 4 | 5;

export class Rating {
  private constructor(public readonly value: RatingValue) {}

  static parse({ value }: { value: number }): Result<Rating, DomainError> {
    if (!Number.isInteger(value)) {
      return err(validationError("rating", "not_integer"));
    }
    if (value < 1 || value > 5) {
      return err(validationError("rating", "out_of_range"));
    }
    return ok(new Rating(value as RatingValue));
  }
}
