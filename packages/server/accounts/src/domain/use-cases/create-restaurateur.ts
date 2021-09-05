import { Either, left } from '@shared/utils';
import { RestaurateurFactory } from '@/domain/factories';
import { RestaurateurRepo } from '@/ports/database';
import { CreateRestaurateurDTO } from '@/domain/use-cases/dtos';
import { DocumentAlreadyInUse, UserNotFound } from '@/domain/use-cases/errors';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';
import { InvalidDocumentPattern, InvalidDocumentType } from '@/domain/factories/errors';
import { Restaurateur } from '@/domain/entities';
import { InfraError } from '@/ports/errors';
import { GetUserUseCase } from '@/domain/use-cases';

type CreateRestaurateurErrors =
  | PropsAreRequired
  | FieldIsRequired
  | InvalidDocumentType
  | InvalidDocumentPattern
  | DocumentAlreadyInUse
  | UserNotFound
  | InfraError;

export class CreateRestaurateurUseCase {
  private readonly restaurateurFactory: RestaurateurFactory;

  private readonly restaurateurRepo: RestaurateurRepo;

  private readonly getUserUseCase: GetUserUseCase;

  public constructor(
    restaurateurFactory: RestaurateurFactory,
    restaurateurRepo: RestaurateurRepo,
    getUserUseCase: GetUserUseCase
  ) {
    this.restaurateurFactory = restaurateurFactory;
    this.restaurateurRepo = restaurateurRepo;
    this.getUserUseCase = getUserUseCase;
  }

  public async execute(dto: CreateRestaurateurDTO): Promise<Either<CreateRestaurateurErrors, Restaurateur>> {
    const restaurateurOrError = this.restaurateurFactory.make({
      id: {},
      document: { type: 'CNPJ', toSanitize: true, value: dto.document },
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

    const userOrError = await this.getUserUseCase.execute({ id: restaurateur.userId.value });

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    return this.restaurateurRepo.save(restaurateur);
  }
}
