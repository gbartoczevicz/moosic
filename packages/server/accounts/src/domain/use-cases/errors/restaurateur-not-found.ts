import { AppError, PlainError } from '@/ports/errors/app';

export class RestaurateurNotFound extends Error implements AppError {
  public constructor() {
    super('Restaurateur not found');
  }

  public toPlain(): PlainError {
    return {
      message: this.message,
      fields: []
    };
  }
}
