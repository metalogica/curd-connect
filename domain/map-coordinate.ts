import type { PoutineStoreId } from "@domain/shared/types";

export class PinCoordinate {
  constructor(
    public readonly topPct: number,
    public readonly leftPct: number,
  ) {}
}

export function computeStorePinCoordinate({
  storeId,
}: {
  storeId: PoutineStoreId;
}): PinCoordinate {
  const hash = (storeId as string)
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const topPct = 15 + (hash % 70);
  const leftPct = 10 + ((hash * 7) % 80);
  return new PinCoordinate(topPct, leftPct);
}
