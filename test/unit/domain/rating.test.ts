import { describe, it, expect } from "vitest";
import { Rating } from "@domain/rating";

describe("Rating", () => {
  it("accepts integers 1 through 5", () => {
    for (const v of [1, 2, 3, 4, 5]) {
      const r = Rating.parse({ value: v });
      expect(r.isOk()).toBe(true);
      if (r.isOk()) expect(r.value.value).toBe(v);
    }
  });

  it("rejects 0 as out_of_range", () => {
    const r = Rating.parse({ value: 0 });
    expect(r.isErr()).toBe(true);
    if (r.isErr() && r.error._tag === "ValidationError") {
      expect(r.error.reason).toBe("out_of_range");
    }
  });

  it("rejects 6 as out_of_range", () => {
    const r = Rating.parse({ value: 6 });
    expect(r.isErr()).toBe(true);
  });

  it("rejects non-integers", () => {
    const r = Rating.parse({ value: 3.5 });
    expect(r.isErr()).toBe(true);
    if (r.isErr() && r.error._tag === "ValidationError") {
      expect(r.error.reason).toBe("not_integer");
    }
  });

  it("rejects NaN", () => {
    const r = Rating.parse({ value: Number.NaN });
    expect(r.isErr()).toBe(true);
  });
});
