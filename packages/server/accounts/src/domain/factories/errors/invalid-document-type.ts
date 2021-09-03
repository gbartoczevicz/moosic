import { AppError, PlainError } from '@/ports/errors';

export class InvalidDocumentType extends Error implements AppError {
  public constructor() {
    super('Invalid document type was provided');
  }

  public toPlain(): PlainError {
    return {
      message: this.message,
      fields: []
    };
  }
}
