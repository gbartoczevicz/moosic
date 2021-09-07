import { Either, left, right } from '@/utils';
import { Document, Id } from '@/domain/entities/values';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';

export type RestaurateurProps = {
  id: Id;
  userId: Id;
  document: Document;
};

export class Restaurateur {
  public readonly id: Id;

  public readonly userId: Id;

  public readonly document: Document;

  private constructor(id: Id, userId: Id, document: Document) {
    this.id = id;
    this.userId = userId;
    this.document = document;
  }

  public static create(props: RestaurateurProps): Either<FieldIsRequired | PropsAreRequired, Restaurateur> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { id, userId, document } = props;

    if (!id) {
      return left(new FieldIsRequired('id'));
    }

    if (!userId) {
      return left(new FieldIsRequired('userId'));
    }

    if (!document) {
      return left(new FieldIsRequired('document'));
    }

    const restaurateur = new Restaurateur(id, userId, document);

    return right(restaurateur);
  }

  public toPlain() {
    return {
      id: this.id.value,
      userId: this.userId.value,
      document: this.document.value
    };
  }
}
