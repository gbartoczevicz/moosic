export function getEnumByValue<T>(anEnum: T, value: unknown): T | undefined {
  const enumValues = Object.values(anEnum);

  const index = enumValues.findIndex((val) => val === value);

  if (index === -1) return undefined;

  return value as T;
}
