import { Artist } from '@/domain/entities';
import { ArtistFactory } from '@/domain/factories';
import { Artist as Persistence } from '@prisma/client';

export class ArtistMapper {
  private readonly artistFactory: ArtistFactory;

  public constructor(artistFactory: ArtistFactory) {
    this.artistFactory = artistFactory;
  }

  public toDomain(persistence: Persistence): Artist {
    const domain = this.artistFactory.make({
      id: { value: persistence.id },
      document: { value: persistence.document, type: 'CPF', toSanitize: false },
      userId: { value: persistence.userId }
    });

    if (domain.isLeft()) {
      throw domain.value;
    }

    return domain.value;
  }

  public toPersistence(domain: Artist): Persistence {
    return domain.toPlain();
  }
}
