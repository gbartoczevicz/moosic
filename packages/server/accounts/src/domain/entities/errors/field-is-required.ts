export class FieldIsRequired extends Error {
  public readonly field: string;

  public constructor(field: string) {
    super('Field is required');

    this.field = field;
  }
}
