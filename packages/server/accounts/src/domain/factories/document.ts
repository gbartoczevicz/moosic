import { Either, left } from '@/utils';
import { DocumentProvider } from '@/ports/providers';
import { Document, DocumentType } from '@/domain/entities/values';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';
import { InvalidDocumentPattern, InvalidDocumentType } from '@/domain/factories/errors';

export type MakeDocumentProps = {
  value: string;
  toSanitize: boolean;
  type: DocumentType;
};

export class DocumentFactory {
  private readonly documentProvider: DocumentProvider;

  public constructor(documentProvider: DocumentProvider) {
    this.documentProvider = documentProvider;
  }

  public make(
    props: MakeDocumentProps
  ): Either<PropsAreRequired | FieldIsRequired | InvalidDocumentType | InvalidDocumentPattern, Document> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { toSanitize, type, value } = props;

    switch (type) {
      case 'CPF':
        return this.validateAndCreateCpf(value, toSanitize);
      case 'CNPJ':
        return this.validateAndCreateCnpj(value, toSanitize);
      default:
        return left(new InvalidDocumentType());
    }
  }

  private validateAndCreateCpf(
    value: string,
    toSanitize: boolean
  ): Either<PropsAreRequired | FieldIsRequired | InvalidDocumentPattern, Document> {
    if (!this.documentProvider.isValidCpf(value)) {
      return left(new InvalidDocumentPattern('CPF'));
    }

    return Document.create({
      value: toSanitize ? this.documentProvider.sanitizeCpf(value) : this.documentProvider.formatCpf(value),
      isSanitized: toSanitize
    });
  }

  private validateAndCreateCnpj(
    value: string,
    toSanitize: boolean
  ): Either<PropsAreRequired | FieldIsRequired | InvalidDocumentPattern, Document> {
    if (!this.documentProvider.isValidCnpj(value)) {
      return left(new InvalidDocumentPattern('CNPJ'));
    }

    return Document.create({
      value: toSanitize ? this.documentProvider.sanitizeCnpj(value) : this.documentProvider.formatCnpj(value),
      isSanitized: toSanitize
    });
  }
}
