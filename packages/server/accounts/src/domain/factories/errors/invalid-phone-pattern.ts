export class InvalidPhonePattern extends Error {
  public constructor() {
    super('Phone number pattern is invalid');
  }
}
