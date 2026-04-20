import { describe, it, expect } from "vitest";
import { ReviewBody, MAX_REVIEW_BODY_LEN } from "@domain/review-body";

describe("ReviewBody", () => {
  it("trims and accepts non-empty input", () => {
    const r = ReviewBody.parse({ raw: "  solid curds  " });
    expect(r.isOk()).toBe(true);
    if (r.isOk()) expect(r.value.value).toBe("solid curds");
  });

  it("rejects empty string", () => {
    const r = ReviewBody.parse({ raw: "" });
    expect(r.isErr()).toBe(true);
    if (r.isErr() && r.error._tag === "ValidationError") {
      expect(r.error.reason).toBe("empty");
    }
  });

  it("rejects whitespace-only input", () => {
    const r = ReviewBody.parse({ raw: "   \n  " });
    expect(r.isErr()).toBe(true);
  });

  it("rejects bodies longer than the cap", () => {
    const r = ReviewBody.parse({ raw: "a".repeat(MAX_REVIEW_BODY_LEN + 1) });
    expect(r.isErr()).toBe(true);
    if (r.isErr() && r.error._tag === "ValidationError") {
      expect(r.error.reason).toBe("too_long");
    }
  });

  it("accepts bodies at the cap", () => {
    const r = ReviewBody.parse({ raw: "a".repeat(MAX_REVIEW_BODY_LEN) });
    expect(r.isOk()).toBe(true);
  });
});
