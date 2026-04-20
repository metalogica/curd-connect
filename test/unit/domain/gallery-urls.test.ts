import { describe, it, expect } from "vitest";
import { GalleryUrl, parseGalleryInput } from "@domain/gallery-urls";

describe("GalleryUrl", () => {
  it("accepts an https URL", () => {
    const r = GalleryUrl.parse({ raw: "https://picsum.photos/seed/x/800/600" });
    expect(r.isOk()).toBe(true);
  });

  it("rejects non-URL strings", () => {
    const r = GalleryUrl.parse({ raw: "not a url" });
    expect(r.isErr()).toBe(true);
  });

  it("rejects non-http(s) protocols", () => {
    const r = GalleryUrl.parse({ raw: "ftp://example.com/a.png" });
    expect(r.isErr()).toBe(true);
  });

  it("rejects empty strings", () => {
    const r = GalleryUrl.parse({ raw: "" });
    expect(r.isErr()).toBe(true);
  });
});

describe("parseGalleryInput", () => {
  it("splits comma-separated URLs, trims, drops empties", () => {
    const r = parseGalleryInput({
      raw: " https://a.com/1.png ,https://b.com/2.png,  ",
    });
    expect(r.isOk()).toBe(true);
    if (r.isOk()) {
      expect(r.value).toHaveLength(2);
      expect(r.value[0]!.value).toBe("https://a.com/1.png");
      expect(r.value[1]!.value).toBe("https://b.com/2.png");
    }
  });

  it("returns an empty array for empty input", () => {
    const r = parseGalleryInput({ raw: "" });
    expect(r.isOk()).toBe(true);
    if (r.isOk()) expect(r.value).toEqual([]);
  });

  it("fails fast when any URL is invalid", () => {
    const r = parseGalleryInput({ raw: "https://a.com/1.png, not-a-url" });
    expect(r.isErr()).toBe(true);
  });

  it("preserves order and does not dedupe", () => {
    const r = parseGalleryInput({
      raw: "https://a.com/1.png, https://a.com/1.png",
    });
    expect(r.isOk()).toBe(true);
    if (r.isOk()) expect(r.value).toHaveLength(2);
  });
});
