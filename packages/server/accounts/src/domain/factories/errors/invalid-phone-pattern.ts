import { AppError, PlainError } from '@/ports/errors';

export class InvalidPhonePattern extends Error implements AppError {
  public constructor() {
    super('Phone number pattern is invalid');
  }

  public toPlain(): PlainError {
    return {
      message: this.message,
      fields: []
    };
  }
}
