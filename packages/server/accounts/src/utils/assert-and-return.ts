import assert from 'assert';

export const assertAndReturn = <T>(value: T | undefined): T => {
  assert(value !== undefined);

  return value;
};
