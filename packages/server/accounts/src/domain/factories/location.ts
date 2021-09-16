import { Either, left } from '@/utils';
import { IdFactory, MakeIdProps } from '@/domain/factories';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';
import { Location } from '@/domain/entities';

export type MakeLocationProps = {
  establishmentId: MakeIdProps;
  address: string;
  num: number;
  postalCode: string;
  latitude: number;
  longitude: number;
};

type LocationEither = Either<PropsAreRequired | FieldIsRequired, Location>;

export class LocationFactory {
  private readonly idFactory: IdFactory;

  public constructor(idFactory: IdFactory) {
    this.idFactory = idFactory;
  }

  public make(props: MakeLocationProps): LocationEither {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { establishmentId, address, latitude, longitude, num, postalCode } = props;

    const idOrError = this.idFactory.make(establishmentId);

    if (idOrError.isLeft()) {
      return left(idOrError.value);
    }

    return Location.create({
      establishmentId: idOrError.value,
      address,
      latitude,
      longitude,
      num,
      postalCode
    });
  }
}
