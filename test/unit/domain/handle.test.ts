import { describe, it, expect } from "vitest";
import { Handle } from "@domain/handle";

describe("Handle", () => {
  it("prepends @ when missing and lowercases", () => {
    const r = Handle.parse({ raw: "GravyGoblin" });
    expect(r.isOk()).toBe(true);
    if (r.isOk()) {
      expect(r.value.base).toBe("gravygoblin");
      expect(r.value.display).toBe("@gravygoblin");
    }
  });

  it("strips an existing leading @ and lowercases", () => {
    const r = Handle.parse({ raw: "@TABARNAK_POUTINE" });
    expect(r.isOk()).toBe(true);
    if (r.isOk()) {
      expect(r.value.base).toBe("tabarnak_poutine");
      expect(r.value.display).toBe("@tabarnak_poutine");
    }
  });

  it("trims surrounding whitespace", () => {
    const r = Handle.parse({ raw: "  curdLord  " });
    expect(r.isOk()).toBe(true);
    if (r.isOk()) expect(r.value.display).toBe("@curdlord");
  });

  it("rejects an empty string", () => {
    const r = Handle.parse({ raw: "" });
    expect(r.isErr()).toBe(true);
  });

  it("rejects a bare @", () => {
    const r = Handle.parse({ raw: "@" });
    expect(r.isErr()).toBe(true);
  });
});
