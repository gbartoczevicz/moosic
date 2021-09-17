import { Either } from '@/utils';
import { InfraError } from '@/ports/errors';
import { Location } from '@/domain/entities';

export type SaveLocation = Either<InfraError, Location>;
export type FindUniqueLocation = Either<InfraError, Location | null>;

export interface LocationsRepo {
  save(location: Location): Promise<SaveLocation>;
  findByPostalCode(postalCode: string): Promise<FindUniqueLocation>;
  findByLatitudeAndLongitude(latitude: number, longitude: number): Promise<FindUniqueLocation>;
}
