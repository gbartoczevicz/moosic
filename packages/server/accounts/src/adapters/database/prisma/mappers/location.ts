import { Location } from '@/domain/entities';
import { LocationFactory } from '@/domain/factories';
import { Location as Persistence } from '@prisma/client';

export class LocationMapper {
  private readonly locationFactory: LocationFactory;

  public constructor(locationFactory: LocationFactory) {
    this.locationFactory = locationFactory;
  }

  public toDomain(persistence: Persistence): Location {
    const domain = this.locationFactory.make({
      ...persistence,
      establishmentId: { value: persistence.establishmentId }
    });

    if (domain.isLeft()) {
      throw domain.value;
    }

    return domain.value;
  }

  public toPersistence(domain: Location): Persistence {
    return domain.toPlain();
  }
}
