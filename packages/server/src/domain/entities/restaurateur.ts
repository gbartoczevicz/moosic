import { Either, left, right } from '@shared/utils';
import { Document } from '@/domain/entities/values';
import { InvalidRestaurateur, PropsAreRequired } from '@/domain/entities/errors';

export type RestaurateurProps = {
  document: Document;
};

export class Restaurateur {
  public readonly document: Document;

  private constructor(document: Document) {
    this.document = document;
  }

  public static create(props: RestaurateurProps): Either<InvalidRestaurateur | PropsAreRequired, Restaurateur> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { document } = props;

    if (!document) {
      return left(new InvalidRestaurateur('Document is required'));
    }

    const restaurateur = new Restaurateur(document);

    return right(restaurateur);
  }
}
