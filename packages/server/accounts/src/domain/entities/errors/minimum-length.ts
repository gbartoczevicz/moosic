import { AppError, PlainError } from '@/ports/errors/app';

export class MinimumLength extends Error implements AppError {
  constructor(length: number) {
    super(`The minimum length for password is ${length}`);
  }

  public toPlain(): PlainError {
    return {
      message: this.message,
      fields: []
    };
  }
}
