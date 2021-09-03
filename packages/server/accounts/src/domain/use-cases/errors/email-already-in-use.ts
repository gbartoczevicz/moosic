import { AppError, PlainError } from '@/ports/errors/app';

export class EmailAlreadyInUse extends Error implements AppError {
  public constructor() {
    super('Email is already in use');
  }

  public toPlain(): PlainError {
    return {
      message: this.message,
      fields: []
    };
  }
}
