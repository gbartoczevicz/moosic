import { Either, left } from '@shared/utils';
import { DocumentHandler } from '@/domain/services/ports';
import { InvalidDocumentPattern } from '@/domain/services/errors';
import { Document } from '@/domain/entities/values';
import { InvalidDocument } from '@/domain/entities/errors';

export class DocumentService {
  private readonly documentHandler: DocumentHandler;

  public constructor(documentHandler: DocumentHandler) {
    this.documentHandler = documentHandler;
  }

  public createDocumentFromPlainCpnjValue(
    plainValue: string,
    toSanitize: boolean
  ): Either<InvalidDocumentPattern | InvalidDocument, Document> {
    if (!this.documentHandler.isValidCnpj(plainValue)) {
      return left(new InvalidDocumentPattern('CNPJ'));
    }

    const document = toSanitize
      ? this.documentHandler.sanitize(plainValue)
      : this.documentHandler.formatCnpj(plainValue);

    return Document.create({
      value: document,
      isSanitized: toSanitize
    });
  }

  public createDocumentFromPlainCpfValue(
    plainValue: string,
    toSanitize: boolean
  ): Either<InvalidDocumentPattern | InvalidDocument, Document> {
    if (!this.documentHandler.isValidCpf(plainValue)) {
      return left(new InvalidDocumentPattern('CPF'));
    }

    const document = toSanitize
      ? this.documentHandler.sanitize(plainValue)
      : this.documentHandler.formatCpf(plainValue);

    return Document.create({
      value: document,
      isSanitized: toSanitize
    });
  }
}
