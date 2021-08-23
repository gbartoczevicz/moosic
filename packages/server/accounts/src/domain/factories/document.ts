import { left } from '@shared/utils';
import { DocumentHandler } from '@/domain/factories/ports';
import { Document, DocumentType } from '@/domain/entities/values';
import { PropsAreRequired } from '@/domain/entities/errors';
import { InvalidDocumentPattern, InvalidDocumentType } from '@/domain/factories/errors';

export type MakeDocumentProps = {
  value: string;
  toSanitize: boolean;
  type: DocumentType;
};

export class DocumentFactory {
  private readonly documentHandler: DocumentHandler;

  public constructor(documentHandler: DocumentHandler) {
    this.documentHandler = documentHandler;
  }

  public make(props: MakeDocumentProps) {
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

  private validateAndCreateCpf(value: string, toSanitize: boolean) {
    if (!this.documentHandler.isValidCpf(value)) {
      return left(new InvalidDocumentPattern('CPF'));
    }

    return Document.create({
      value: toSanitize ? this.documentHandler.sanitize(value) : this.documentHandler.formatCpf(value),
      isSanitized: toSanitize
    });
  }

  private validateAndCreateCnpj(value: string, toSanitize: boolean) {
    if (!this.documentHandler.isValidCnpj(value)) {
      return left(new InvalidDocumentPattern('CNPJ'));
    }

    return Document.create({
      value: toSanitize ? this.documentHandler.sanitize(value) : this.documentHandler.formatCnpj(value),
      isSanitized: toSanitize
    });
  }
}
