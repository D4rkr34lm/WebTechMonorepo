export function isValue<T>(value: undefined | null | T): value is T {
  return value !== undefined && value !== null;
}

export function isNotValue<T>(value: undefined | null | T): value is null | undefined {
  return value === undefined || value === null;
}
