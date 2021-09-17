import { LocationsRepo, SaveLocation, FindUniqueLocation } from '@/ports/database';
import { Location } from '@/domain/entities';
import { right } from '@/utils';
import { makeId } from '@/domain/entities/values/fakes';
import { Id } from '@/domain/entities/values';

export class FakeLocationsRepo implements LocationsRepo {
  public async save(location: Location): Promise<SaveLocation> {
    return Promise.resolve(right(location));
  }

  public async findByPostalCode(postalCode: string): Promise<FindUniqueLocation> {
    const location = Location.create({
      establishmentId: makeId({}).value as Id,
      address: 'any',
      latitude: 123,
      longitude: 123,
      num: 123,
      postalCode
    }).value as Location;

    return Promise.resolve(right(location));
  }

  public async findByLatitudeAndLongitude(latitude: number, longitude: number): Promise<FindUniqueLocation> {
    const location = Location.create({
      establishmentId: makeId({}).value as Id,
      address: 'any',
      latitude,
      longitude,
      num: 123,
      postalCode: 'any'
    }).value as Location;

    return Promise.resolve(right(location));
  }
}
