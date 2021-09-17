import { AppError, PlainError } from '@/ports/errors/app';

export class PostalCodeAlreadyInUse extends Error implements AppError {
  public constructor() {
    super('Postal code is already in use');
  }

  public toPlain(): PlainError {
    return {
      message: this.message,
      fields: []
    };
  }
}
