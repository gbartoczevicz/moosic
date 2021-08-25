export class EmailAlreadyInUse extends Error {
  public constructor() {
    super('Email is already in use');
  }
}
