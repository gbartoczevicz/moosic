import { RestaurateurRepo } from '@/ports/database';
import { GetRestaurateurDTO } from '@/domain/use-cases/dtos';
import { IdFactory } from '@/domain/factories';
import { Either, left, right } from '@shared/utils';
import { RestaurateurNotFound } from '@/domain/use-cases/errors';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';
import { InfraError } from '@/ports/errors';
import { Restaurateur } from '@/domain/entities';

type UseCaseEither = Either<PropsAreRequired | FieldIsRequired | InfraError | RestaurateurNotFound, Restaurateur>;

export class GetRestaurateurUseCase {
  private readonly restaurateurRepo: RestaurateurRepo;

  private readonly idFactory: IdFactory;

  public constructor(restaurateurRepo: RestaurateurRepo, idFactory: IdFactory) {
    this.restaurateurRepo = restaurateurRepo;
    this.idFactory = idFactory;
  }

  public async execute(dto: GetRestaurateurDTO): Promise<UseCaseEither> {
    const idOrError = this.idFactory.make({ value: dto.userId });

    if (idOrError.isLeft()) {
      return left(idOrError.value);
    }

    const restaurateurOrError = await this.restaurateurRepo.findByUserId(idOrError.value);

    if (restaurateurOrError.isLeft()) {
      return left(restaurateurOrError.value);
    }

    const restaurateur = restaurateurOrError.value;

    if (!restaurateur) {
      return left(new RestaurateurNotFound());
    }

    return right(restaurateur);
  }
}
