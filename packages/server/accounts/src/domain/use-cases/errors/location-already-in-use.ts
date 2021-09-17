import { AppError, PlainError } from '@/ports/errors/app';

export class LocationAlreadyInUse extends Error implements AppError {
  public constructor() {
    super('Location is already in use');
  }

  public toPlain(): PlainError {
    return {
      message: this.message,
      fields: []
    };
  }
}
