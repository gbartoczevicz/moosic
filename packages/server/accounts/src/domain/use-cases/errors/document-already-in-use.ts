import { AppError, PlainError } from '@/ports/errors/app';

export class DocumentAlreadyInUse extends Error implements AppError {
  public constructor() {
    super('Document is already in use');
  }

  public toPlain(): PlainError {
    return {
      message: this.message,
      fields: []
    };
  }
}
