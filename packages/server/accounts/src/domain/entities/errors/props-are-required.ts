import { AppError, PlainError } from '@/ports/errors/app';

export class PropsAreRequired extends Error implements AppError {
  constructor() {
    super('Props are required');
  }

  public toPlain(): PlainError {
    return {
      message: this.message,
      fields: []
    };
  }
}
