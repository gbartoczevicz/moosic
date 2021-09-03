import { Either, left, right } from '@shared/utils';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';

export type DocumentProps = {
  value: string;
  isSanitized?: boolean;
};

export type DocumentType = 'CPF' | 'CNPJ';

export class Document {
  public readonly value: string;

  public readonly isSanitized: boolean;

  private constructor(value: string, isSanitized: boolean) {
    this.value = value;
    this.isSanitized = isSanitized;
  }

  public static create(props: DocumentProps): Either<PropsAreRequired | FieldIsRequired, Document> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { value, isSanitized } = props;

    if (!value) {
      return left(new FieldIsRequired('document'));
    }

    const document = new Document(value, !!isSanitized);

    return right(document);
  }
}
