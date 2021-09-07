import { Either, left } from '@/utils';
import { ArtistFactory } from '@/domain/factories';
import { ArtistsRepo } from '@/ports/database';
import { CreateArtistDTO } from '@/domain/use-cases/dtos';
import { DocumentAlreadyInUse, UserNotFound } from '@/domain/use-cases/errors';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';
import { InvalidDocumentPattern, InvalidDocumentType } from '@/domain/factories/errors';
import { Artist } from '@/domain/entities';
import { InfraError } from '@/ports/errors';
import { GetUserUseCase } from '@/domain/use-cases';

type UseCaseEither = Either<
  | PropsAreRequired
  | FieldIsRequired
  | InvalidDocumentType
  | InvalidDocumentPattern
  | DocumentAlreadyInUse
  | UserNotFound
  | InfraError,
  Artist
>;

export class CreateArtistUseCase {
  private readonly artistFactory: ArtistFactory;

  private readonly artistsRepo: ArtistsRepo;

  private readonly getUserUseCase: GetUserUseCase;

  public constructor(artistFactory: ArtistFactory, artistsRepo: ArtistsRepo, getUserUseCase: GetUserUseCase) {
    this.artistFactory = artistFactory;
    this.artistsRepo = artistsRepo;
    this.getUserUseCase = getUserUseCase;
  }

  public async execute(dto: CreateArtistDTO): Promise<UseCaseEither> {
    const artistOrError = this.artistFactory.make({
      id: {},
      document: { type: 'CPF', toSanitize: true, value: dto.document },
      userId: { value: dto.userId }
    });

    if (artistOrError.isLeft()) {
      return left(artistOrError.value);
    }

    const artist = artistOrError.value;

    const documentOrError = await this.artistsRepo.findByDocument(artist.document);

    if (documentOrError.isLeft()) {
      return left(documentOrError.value);
    }

    if (documentOrError.value) {
      return left(new DocumentAlreadyInUse());
    }

    const userOrError = await this.getUserUseCase.execute({ id: artist.userId.value });

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    return this.artistsRepo.save(artist);
  }
}
