import { Rating } from "@domain/rating";

export class AverageRating {
  private constructor(
    public readonly count: number,
    public readonly sum: number,
    public readonly mean: number | null,
  ) {}

  static fromRatings({
    ratings,
  }: {
    ratings: ReadonlyArray<Rating>;
  }): AverageRating {
    if (ratings.length === 0) {
      return new AverageRating(0, 0, null);
    }
    const sum = ratings.reduce((acc, r) => acc + r.value, 0);
    return new AverageRating(ratings.length, sum, sum / ratings.length);
  }

  static fromValues({ values }: { values: ReadonlyArray<number> }): AverageRating {
    if (values.length === 0) {
      return new AverageRating(0, 0, null);
    }
    const sum = values.reduce((acc, v) => acc + v, 0);
    return new AverageRating(values.length, sum, sum / values.length);
  }
}
