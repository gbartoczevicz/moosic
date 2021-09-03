import { DocumentType } from '@/domain/entities/values';
import { AppError, PlainError } from '@/ports/errors';

export class InvalidDocumentPattern extends Error implements AppError {
  public constructor(type: DocumentType) {
    super(`Value must follow ${type} pattern`);
  }

  public toPlain(): PlainError {
    return {
      message: this.message,
      fields: []
    };
  }
}
