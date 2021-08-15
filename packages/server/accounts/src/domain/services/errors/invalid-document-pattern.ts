export class InvalidDocumentPattern extends Error {
  public constructor(document: 'CNPJ' | 'CPF') {
    super(`Value must follow ${document} pattern`);
  }
}
