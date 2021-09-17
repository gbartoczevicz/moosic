import { EstablishmentsRepo, LocationsRepo } from '@/ports/database';
import { LocationFactory } from '@/domain/factories';
import { UpsertLocationDTO } from '@/domain/use-cases/dtos';
import { Either, left } from '@/utils';
import { EstablishmentNotFound, LocationAlreadyInUse, PostalCodeAlreadyInUse } from '@/domain/use-cases/errors';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';
import { InfraError } from '@/ports/errors';
import { Location } from '@/domain/entities';

type UseCaseEither = Either<
  | PropsAreRequired
  | FieldIsRequired
  | InfraError
  | EstablishmentNotFound
  | LocationAlreadyInUse
  | PostalCodeAlreadyInUse,
  Location
>;

export class UpsertLocationUseCase {
  private readonly locationsRepo: LocationsRepo;

  private readonly establishmentRepo: EstablishmentsRepo;

  private readonly locationFactory: LocationFactory;

  public constructor(
    locationsRepo: LocationsRepo,
    establishmentRepo: EstablishmentsRepo,
    locationFactory: LocationFactory
  ) {
    this.locationsRepo = locationsRepo;
    this.establishmentRepo = establishmentRepo;
    this.locationFactory = locationFactory;
  }

  public async execute(dto: UpsertLocationDTO): Promise<UseCaseEither> {
    const locationOrError = this.locationFactory.make({
      ...dto,
      establishmentId: { value: dto.establishmentId }
    });

    if (locationOrError.isLeft()) {
      return left(locationOrError.value);
    }

    const location = locationOrError.value;

    const establishmentExistsOrError = await this.establishmentRepo.findById(location.establishmentId);

    if (establishmentExistsOrError.isLeft()) {
      return left(establishmentExistsOrError.value);
    }

    if (!establishmentExistsOrError.value) {
      return left(new EstablishmentNotFound());
    }

    const latitudeAndLongitudeAlreadyInUseOrError = await this.locationsRepo.findByLatitudeAndLongitude(
      location.latitude,
      location.longitude
    );

    if (latitudeAndLongitudeAlreadyInUseOrError.isLeft()) {
      return left(latitudeAndLongitudeAlreadyInUseOrError.value);
    }

    if (!latitudeAndLongitudeAlreadyInUseOrError.value) {
      return left(new LocationAlreadyInUse());
    }

    const postalCodeInUseOrError = await this.locationsRepo.findByPostalCode(location.postalCode);

    if (postalCodeInUseOrError.isLeft()) {
      return left(postalCodeInUseOrError.value);
    }

    if (!postalCodeInUseOrError.value) {
      return left(new PostalCodeAlreadyInUse());
    }

    return this.locationsRepo.save(location);
  }
}
