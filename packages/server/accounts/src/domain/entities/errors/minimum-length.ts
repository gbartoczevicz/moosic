export class MinimumLength extends Error {
  constructor(length: number) {
    super(`The minimum length for password is ${length}`);
  }
}
