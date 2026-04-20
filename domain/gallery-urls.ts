import { ok, err, type Result } from "@domain/shared/result";
import { validationError, type DomainError } from "@domain/shared/errors";

export class GalleryUrl {
  private constructor(public readonly value: string) {}

  static parse({ raw }: { raw: string }): Result<GalleryUrl, DomainError> {
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      return err(validationError("gallery_urls", "invalid_url"));
    }
    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        return err(validationError("gallery_urls", "invalid_url"));
      }
    } catch {
      return err(validationError("gallery_urls", "invalid_url"));
    }
    return ok(new GalleryUrl(trimmed));
  }
}

export function parseGalleryInput({
  raw,
}: {
  raw: string;
}): Result<ReadonlyArray<GalleryUrl>, DomainError> {
  const parts = raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const urls: GalleryUrl[] = [];
  for (const part of parts) {
    const result = GalleryUrl.parse({ raw: part });
    if (result.isErr()) {
      return result;
    }
    urls.push(result.value);
  }
  return ok(urls);
}
