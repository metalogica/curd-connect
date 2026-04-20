import { describe, it, expect } from "vitest";
import { compareByCreatedAtDesc } from "@domain/ordering";
import { asEpochMs, type EpochMs } from "@domain/shared/types";

type Row = { readonly id: string; readonly createdAt: EpochMs };

describe("compareByCreatedAtDesc", () => {
  it("sorts rows newest first", () => {
    const rows: Row[] = [
      { id: "a", createdAt: asEpochMs(100) },
      { id: "b", createdAt: asEpochMs(300) },
      { id: "c", createdAt: asEpochMs(200) },
    ];
    const sorted = [...rows].sort(compareByCreatedAtDesc);
    expect(sorted.map((r) => r.id)).toEqual(["b", "c", "a"]);
  });

  it("returns 0 for equal timestamps", () => {
    const a: Row = { id: "a", createdAt: asEpochMs(1) };
    const b: Row = { id: "b", createdAt: asEpochMs(1) };
    expect(compareByCreatedAtDesc(a, b)).toBe(0);
  });
});
