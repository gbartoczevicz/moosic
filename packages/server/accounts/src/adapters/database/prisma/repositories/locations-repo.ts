import { LocationsRepo, SaveLocation, FindUniqueLocation } from '@/ports/database';
import { LocationMapper } from '@/adapters/database/prisma/mappers';
import { Location } from '@/domain/entities';
import { left, right } from '@/utils';
import { InfraError } from '@/ports/errors';
import { prismaClient } from '@/adapters/database/prisma';

export class PrismaLocationsRepo implements LocationsRepo {
  private readonly locationMapper: LocationMapper;

  public constructor(locationMapper: LocationMapper) {
    this.locationMapper = locationMapper;
  }

  public async save(location: Location): Promise<SaveLocation> {
    try {
      const persistence = this.locationMapper.toPersistence(location);

      const savedPersistence = await prismaClient.location.upsert({
        create: persistence,
        update: persistence,
        where: {
          establishmentId: persistence.establishmentId
        }
      });

      const domain = this.locationMapper.toDomain(savedPersistence);

      return right(domain);
    } catch (err) {
      return left(new InfraError(err.message));
    }
  }

  public async findByLatitudeAndLongitude(latitude: number, longitude: number): Promise<FindUniqueLocation> {
    try {
      const savedPersistence = await prismaClient.location.findUnique({
        where: {
          locations_coordinates: { latitude, longitude }
        }
      });

      const domain = savedPersistence ? this.locationMapper.toDomain(savedPersistence) : null;

      return right(domain);
    } catch (err) {
      return left(new InfraError(err.message));
    }
  }

  public async findByPostalCode(postalCode: string): Promise<FindUniqueLocation> {
    try {
      const savedPersistence = await prismaClient.location.findUnique({
        where: {
          postalCode
        }
      });

      const domain = savedPersistence ? this.locationMapper.toDomain(savedPersistence) : null;

      return right(domain);
    } catch (err) {
      return left(new InfraError(err.message));
    }
  }
}
