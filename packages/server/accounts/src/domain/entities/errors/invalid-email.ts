import { AppError, PlainError } from '@/ports/errors/app';

export class InvalidEmail extends Error implements AppError {
  constructor(message: string) {
    super(message);
  }

  public toPlain(): PlainError {
    return {
      message: this.message,
      fields: []
    };
  }
}
