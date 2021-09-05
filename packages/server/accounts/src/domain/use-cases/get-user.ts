import { Either, left, right } from '@shared/utils';
import { UsersRepo } from '@/ports/database';
import { GetUserDTO } from '@/domain/use-cases/dtos';
import { UserNotFound } from '@/domain/use-cases/errors';
import { InfraError } from '@/ports/errors';
import { User } from '@/domain/entities';
import { IdFactory } from '@/domain/factories';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';

type UseCaseErrors = PropsAreRequired | FieldIsRequired | InfraError | UserNotFound;

export class GetUserUseCase {
  private readonly usersRepo: UsersRepo;

  private readonly idFactory: IdFactory;

  public constructor(usersRepo: UsersRepo, idFactory: IdFactory) {
    this.usersRepo = usersRepo;
    this.idFactory = idFactory;
  }

  public async execute(dto: GetUserDTO): Promise<Either<UseCaseErrors, User>> {
    const idOrError = this.idFactory.make({ value: dto.id });

    if (idOrError.isLeft()) {
      return left(idOrError.value);
    }

    const userOrError = await this.usersRepo.findById(idOrError.value);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    if (!userOrError.value) {
      return left(new UserNotFound());
    }

    return right(userOrError.value);
  }
}
