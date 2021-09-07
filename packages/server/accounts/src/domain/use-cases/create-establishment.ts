import { Either, left } from '@/utils';
import { EstablishmentFactory } from '@/domain/factories';
import { GetRestaurateurUseCase } from '@/domain/use-cases';
import { CreateEstablishmentDTO } from '@/domain/use-cases/dtos';
import { EstablishmentsRepo } from '@/ports/database';
import { PhoneAlreadyInUse, RestaurateurNotFound } from '@/domain/use-cases/errors';
import { Establishment } from '@/domain/entities';
import { InfraError } from '@/ports/errors';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';
import { InvalidPhonePattern } from '@/domain/factories/errors';

type UseCaseEither = Either<
  PropsAreRequired | FieldIsRequired | InvalidPhonePattern | InfraError | PhoneAlreadyInUse | RestaurateurNotFound,
  Establishment
>;

export class CreateEstablishmentUseCase {
  private readonly establishmentFactory: EstablishmentFactory;

  private readonly establishmentRepo: EstablishmentsRepo;

  private readonly getRestaurateurUseCase: GetRestaurateurUseCase;

  public constructor(
    establishmentFactory: EstablishmentFactory,
    establishmentRepo: EstablishmentsRepo,
    getRestaurateurUseCase: GetRestaurateurUseCase
  ) {
    this.establishmentFactory = establishmentFactory;
    this.establishmentRepo = establishmentRepo;
    this.getRestaurateurUseCase = getRestaurateurUseCase;
  }

  public async execute(dto: CreateEstablishmentDTO): Promise<UseCaseEither> {
    const establishmentOrError = this.establishmentFactory.make({
      id: {},
      name: dto.name,
      phone: { value: dto.phone },
      restaurateurId: { value: dto.restaurateurId }
    });

    if (establishmentOrError.isLeft()) {
      return left(establishmentOrError.value);
    }

    const establishment = establishmentOrError.value;

    const establishmentWithSamePhoneOrError = await this.establishmentRepo.findByPhone(establishment.phone);

    if (establishmentWithSamePhoneOrError.isLeft()) {
      return left(establishmentWithSamePhoneOrError.value);
    }

    if (establishmentWithSamePhoneOrError.value) {
      return left(new PhoneAlreadyInUse());
    }

    const restaurateurOrError = await this.getRestaurateurUseCase.execute({
      userId: establishment.restaurateurId.value
    });

    if (restaurateurOrError.isLeft()) {
      return left(restaurateurOrError.value);
    }

    /** @todo Add restaurateur HTTP request middleware to find by user id */
    const plainEstablishment = establishment.toPlain();

    const toPersistEstablishmentOrError = this.establishmentFactory.make({
      id: { value: plainEstablishment.id },
      name: plainEstablishment.name,
      phone: { value: plainEstablishment.phone },
      restaurateurId: { value: restaurateurOrError.value.id.value }
    });

    if (toPersistEstablishmentOrError.isLeft()) {
      return left(toPersistEstablishmentOrError.value);
    }

    const toPersistEstablishment = toPersistEstablishmentOrError.value;

    return this.establishmentRepo.save(toPersistEstablishment);
  }
}
