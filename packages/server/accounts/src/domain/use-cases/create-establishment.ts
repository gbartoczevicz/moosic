import { Either, left } from '@/utils';
import { EstablishmentFactory } from '@/domain/factories';
import { CreateEstablishmentDTO } from '@/domain/use-cases/dtos';
import { EstablishmentsRepo } from '@/ports/database';
import { PhoneAlreadyInUse } from '@/domain/use-cases/errors';
import { Establishment } from '@/domain/entities';
import { InfraError } from '@/ports/errors';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';
import { InvalidPhonePattern } from '@/domain/factories/errors';

type UseCaseEither = Either<
  PropsAreRequired | FieldIsRequired | InvalidPhonePattern | InfraError | PhoneAlreadyInUse,
  Establishment
>;

export class CreateEstablishmentUseCase {
  private readonly establishmentFactory: EstablishmentFactory;

  private readonly establishmentRepo: EstablishmentsRepo;

  public constructor(establishmentFactory: EstablishmentFactory, establishmentRepo: EstablishmentsRepo) {
    this.establishmentFactory = establishmentFactory;
    this.establishmentRepo = establishmentRepo;
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

    return this.establishmentRepo.save(establishmentOrError.value);
  }
}
