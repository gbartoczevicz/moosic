export class PhoneAlreadyInUse extends Error {
  public constructor() {
    super('Phone is already in use');
  }
}
