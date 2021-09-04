import { Either, left } from '@shared/utils';
import { RestaurateurFactory } from '@/domain/factories';
import { RestaurateurRepo } from '@/ports/database';
import { CreateRestaurateurDTO } from '@/domain/use-cases/dtos';
import { DocumentAlreadyInUse } from '@/domain/use-cases/errors';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';
import { InvalidDocumentPattern, InvalidDocumentType } from '@/domain/factories/errors';
import { Restaurateur } from '@/domain/entities';
import { InfraError } from '@/ports/errors';

type CreateRestaurateurErrors =
  | PropsAreRequired
  | FieldIsRequired
  | InvalidDocumentType
  | InvalidDocumentPattern
  | DocumentAlreadyInUse
  | InfraError;

export class CreateRestaurateurUseCase {
  private readonly restaurateurFactory: RestaurateurFactory;

  private readonly restaurateurRepo: RestaurateurRepo;

  public constructor(restaurateurFactory: RestaurateurFactory, restaurateurRepo: RestaurateurRepo) {
    this.restaurateurFactory = restaurateurFactory;
    this.restaurateurRepo = restaurateurRepo;
  }

  public async execute(dto: CreateRestaurateurDTO): Promise<Either<CreateRestaurateurErrors, Restaurateur>> {
    const restaurateurOrError = this.restaurateurFactory.make({
      id: {},
      document: {
        ...dto.document,
        toSanitize: true
      },
      userId: { value: dto.userId }
    });

    if (restaurateurOrError.isLeft()) {
      return left(restaurateurOrError.value);
    }

    const restaurateur = restaurateurOrError.value;

    const documentOrError = await this.restaurateurRepo.findByDocument(restaurateur.document);

    if (documentOrError.isLeft()) {
      return left(documentOrError.value);
    }

    if (documentOrError.value) {
      return left(new DocumentAlreadyInUse());
    }

    return this.restaurateurRepo.save(restaurateur);
  }
}
