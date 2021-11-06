export function getEnumByValue<T>(anEnum: T, value: unknown): T[keyof T] | undefined {
  const index = Object.values(anEnum).findIndex((val) => val === value);

  if (index === -1) return undefined;

  const key = index as keyof T;

  return anEnum[key];
}
