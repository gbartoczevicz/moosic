import { Either, left, right } from '@shared/utils';
import { Document } from '@/domain/entities/values';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';

export type RestaurateurProps = {
  document: Document;
};

export class Restaurateur {
  public readonly document: Document;

  private constructor(document: Document) {
    this.document = document;
  }

  public static create(props: RestaurateurProps): Either<FieldIsRequired | PropsAreRequired, Restaurateur> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { document } = props;

    if (!document) {
      return left(new FieldIsRequired('document'));
    }

    const restaurateur = new Restaurateur(document);

    return right(restaurateur);
  }
}
