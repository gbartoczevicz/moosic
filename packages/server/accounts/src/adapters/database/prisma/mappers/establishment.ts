import { Establishment as Persistence } from '@prisma/client';
import { EstablishmentFactory } from '@/domain/factories';
import { Establishment } from '@/domain/entities';

export class EstablishmentMapper {
  private readonly establishmentFactory: EstablishmentFactory;

  public constructor(establishmentFactory: EstablishmentFactory) {
    this.establishmentFactory = establishmentFactory;
  }

  public toDomain(persistence: Persistence): Establishment {
    const domain = this.establishmentFactory.make({
      id: { value: persistence.id },
      name: persistence.name,
      phone: { value: persistence.phone },
      restaurateurId: { value: persistence.restaurateurId }
    });

    if (domain.isLeft()) {
      throw domain.value;
    }

    return domain.value;
  }

  public toPersistence(domain: Establishment): Persistence {
    return domain.toPlain();
  }
}
