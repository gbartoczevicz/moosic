import { AppError, PlainError } from '@/ports/errors/app';

export class PhoneAlreadyInUse extends Error implements AppError {
  public constructor() {
    super('Phone is already in use');
  }

  public toPlain(): PlainError {
    return {
      message: this.message,
      fields: []
    };
  }
}
