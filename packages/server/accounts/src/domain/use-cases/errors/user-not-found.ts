import { AppError, PlainError } from '@/ports/errors/app';

export class UserNotFound extends Error implements AppError {
  public constructor() {
    super('User not found');
  }

  public toPlain(): PlainError {
    return {
      message: this.message,
      fields: []
    };
  }
}
