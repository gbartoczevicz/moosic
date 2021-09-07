import { Either, left } from '@/utils';
import { IdFactory, DocumentFactory, MakeIdProps, MakeDocumentProps } from '@/domain/factories';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';
import { Artist } from '@/domain/entities';
import { InvalidDocumentPattern, InvalidDocumentType } from '@/domain/factories/errors';

export type MakeArtistProps = {
  id: MakeIdProps;
  userId: MakeIdProps;
  document: MakeDocumentProps;
};

type ArtistEither = Either<PropsAreRequired | FieldIsRequired | InvalidDocumentType | InvalidDocumentPattern, Artist>;

export class ArtistFactory {
  private readonly idFactory: IdFactory;

  private readonly documentFactory: DocumentFactory;

  public constructor(idFactory: IdFactory, documentFactory: DocumentFactory) {
    this.idFactory = idFactory;
    this.documentFactory = documentFactory;
  }

  public make(props: MakeArtistProps): ArtistEither {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { id, userId, document } = props;

    const idOrError = this.idFactory.make(id);

    if (idOrError.isLeft()) {
      return left(idOrError.value);
    }

    const userIdOrError = this.idFactory.make(userId);

    if (userIdOrError.isLeft()) {
      return left(userIdOrError.value);
    }

    const documentOrError = this.documentFactory.make(document);

    if (documentOrError.isLeft()) {
      return left(documentOrError.value);
    }

    return Artist.create({
      id: idOrError.value,
      userId: userIdOrError.value,
      document: documentOrError.value
    });
  }
}
