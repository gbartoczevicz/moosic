import { DocumentType } from '@/domain/entities/values';

export class InvalidDocumentPattern extends Error {
  public constructor(type: DocumentType) {
    super(`Value must follow ${type} pattern`);
  }
}
