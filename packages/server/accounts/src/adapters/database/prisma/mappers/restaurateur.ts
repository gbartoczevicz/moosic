import { Restaurateur } from '@/domain/entities';
import { RestaurateurFactory } from '@/domain/factories';
import { Restaurateur as Persistence } from '@prisma/client';

export class RestaurateurMapper {
  private readonly restaurateurFactory: RestaurateurFactory;

  public constructor(restaurateurFactory: RestaurateurFactory) {
    this.restaurateurFactory = restaurateurFactory;
  }

  public toDomain(persistence: Persistence): Restaurateur {
    const domain = this.restaurateurFactory.make({
      id: { value: persistence.id },
      document: { value: persistence.document, type: 'CNPJ', toSanitize: false },
      userId: { value: persistence.userId }
    });

    if (domain.isLeft()) {
      throw domain.value;
    }

    return domain.value;
  }

  public toPersistence(domain: Restaurateur): Persistence {
    return domain.toPlain();
  }
}
