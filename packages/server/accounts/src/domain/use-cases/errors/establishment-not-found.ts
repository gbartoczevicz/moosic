import { AppError, PlainError } from '@/ports/errors';

export class EstablishmentNotFound extends Error implements AppError {
  public constructor() {
    super('Establishment not found');
  }

  public toPlain(): PlainError {
    return {
      message: this.message,
      fields: []
    };
  }
}
