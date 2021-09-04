import { left } from '@shared/utils';
import { IdFactory, DocumentFactory, MakeIdProps, MakeDocumentProps } from '@/domain/factories';
import { PropsAreRequired } from '@/domain/entities/errors';
import { Restaurateur } from '../entities';

export type MakeRestaurateurProps = {
  id: MakeIdProps;
  userId: MakeIdProps;
  document: MakeDocumentProps;
};

export class RestaurateurFactory {
  private readonly idFactory: IdFactory;

  private readonly documentFactory: DocumentFactory;

  public constructor(idFactory: IdFactory, documentFactory: DocumentFactory) {
    this.idFactory = idFactory;
    this.documentFactory = documentFactory;
  }

  public async make(props: MakeRestaurateurProps) {
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

    return Restaurateur.create({
      id: idOrError.value,
      userId: userIdOrError.value,
      document: documentOrError.value
    });
  }
}
