export function dateNullToStringNull<T extends Date | null>(
  target: T,
): string | null {
  return target?.toISOString() ?? null;
}
