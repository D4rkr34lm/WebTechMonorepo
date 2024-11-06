export function hasValue<T>(value: undefined | null | T): value is T {
  return value !== undefined && value !== null;
}

export function hasNoValue<T>(value: undefined | null | T): value is null | undefined {
  return value === undefined || value === null;
}
