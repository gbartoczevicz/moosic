export class InvalidDocumentType extends Error {
  public constructor() {
    super('Invalid document type was provided');
  }
}
