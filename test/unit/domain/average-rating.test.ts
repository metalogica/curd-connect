import { describe, it, expect } from "vitest";
import { AverageRating } from "@domain/average-rating";

describe("AverageRating.fromValues", () => {
  it("returns null mean for empty input", () => {
    const avg = AverageRating.fromValues({ values: [] });
    expect(avg.count).toBe(0);
    expect(avg.sum).toBe(0);
    expect(avg.mean).toBeNull();
  });

  it("returns the value itself for a single rating", () => {
    const avg = AverageRating.fromValues({ values: [5] });
    expect(avg.count).toBe(1);
    expect(avg.sum).toBe(5);
    expect(avg.mean).toBe(5);
  });

  it("computes a non-integer mean without rounding", () => {
    const avg = AverageRating.fromValues({ values: [4, 5] });
    expect(avg.count).toBe(2);
    expect(avg.sum).toBe(9);
    expect(avg.mean).toBe(4.5);
  });
});
