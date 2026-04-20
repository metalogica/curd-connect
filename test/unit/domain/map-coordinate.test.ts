import { describe, it, expect } from "vitest";
import { computeStorePinCoordinate } from "@domain/map-coordinate";
import { asPoutineStoreId } from "@domain/shared/types";

describe("computeStorePinCoordinate", () => {
  it("is deterministic for the same id", () => {
    const id = asPoutineStoreId("s1");
    const a = computeStorePinCoordinate({ storeId: id });
    const b = computeStorePinCoordinate({ storeId: id });
    expect(a.topPct).toBe(b.topPct);
    expect(a.leftPct).toBe(b.leftPct);
  });

  it("keeps topPct in [15, 85) and leftPct in [10, 90)", () => {
    for (const raw of ["s1", "s2", "s42", "banquise", "poutine-lord"]) {
      const coord = computeStorePinCoordinate({ storeId: asPoutineStoreId(raw) });
      expect(coord.topPct).toBeGreaterThanOrEqual(15);
      expect(coord.topPct).toBeLessThan(85);
      expect(coord.leftPct).toBeGreaterThanOrEqual(10);
      expect(coord.leftPct).toBeLessThan(90);
    }
  });

  it("usually yields different pins for different ids", () => {
    const a = computeStorePinCoordinate({ storeId: asPoutineStoreId("s1") });
    const b = computeStorePinCoordinate({ storeId: asPoutineStoreId("s2") });
    const same = a.topPct === b.topPct && a.leftPct === b.leftPct;
    expect(same).toBe(false);
  });
});
