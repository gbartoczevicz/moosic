import { AppError, PlainError } from '@/ports/errors';

export class InvalidCredentials extends Error implements AppError {
  public constructor() {
    super('Invalid Credentials');
  }

  public toPlain(): PlainError {
    return {
      message: this.message,
      fields: []
    };
  }
}
