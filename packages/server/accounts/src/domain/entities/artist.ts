import { Either, left, right } from '@shared/utils';
import { Document, Id } from '@/domain/entities/values';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';

type ArtistProps = {
  id: Id;
  document: Document;
  userId: Id;
};

export class Artist {
  public readonly id: Id;

  public readonly document: Document;

  public readonly userId: Id;

  private constructor(id: Id, document: Document, userId: Id) {
    this.id = id;
    this.document = document;
    this.userId = userId;
  }

  public static create(props: ArtistProps): Either<PropsAreRequired, Artist> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { id, document, userId } = props;

    if (!id) {
      return left(new FieldIsRequired('id'));
    }

    if (!document) {
      return left(new FieldIsRequired('document'));
    }

    if (!userId) {
      return left(new FieldIsRequired('userId'));
    }

    return right(new Artist(id, document, userId));
  }

  public toPlain() {
    return {
      id: this.id.value,
      document: this.document.value,
      userId: this.userId.value
    };
  }
}
