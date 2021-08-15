export class InvalidPassword extends Error {
  constructor(message: string) {
    super(message);
  }
}
