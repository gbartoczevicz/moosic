export function getEnumByValue<T>(anEnum: T, value: unknown): T[keyof T] | null {
  const index = Object.values(anEnum).findIndex((val) => val === value);

  if (index === -1) return null;

  const key = index as keyof T;

  return anEnum[key];
}
