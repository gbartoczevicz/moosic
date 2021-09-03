import { AppError, PlainError } from '@/ports/errors/app';

export class FieldIsRequired extends Error implements AppError {
  public readonly field: string;

  public constructor(field: string) {
    super('Field is required');

    this.field = field;
  }

  public toPlain(): PlainError {
    return {
      message: this.message,
      fields: [this.field]
    };
  }
}
