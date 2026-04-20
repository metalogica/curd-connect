import { ok, err, type Result } from "@domain/shared/result";
import { validationError, type DomainError } from "@domain/shared/errors";

export class Handle {
  private constructor(
    public readonly base: string,
    public readonly display: string,
  ) {}

  static parse({ raw }: { raw: string }): Result<Handle, DomainError> {
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      return err(validationError("handle", "empty"));
    }
    const base = (trimmed.startsWith("@") ? trimmed.slice(1) : trimmed).toLowerCase();
    if (base.length === 0) {
      return err(validationError("handle", "empty"));
    }
    return ok(new Handle(base, `@${base}`));
  }
}
