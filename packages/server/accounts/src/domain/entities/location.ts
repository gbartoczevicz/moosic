import { Either, left, right } from '@/utils';
import { Id } from '@/domain/entities/values';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';

export type LocationProps = {
  establishmentId: Id;
  address: string;
  num: number;
  postalCode: string;
  latitude: number;
  longitude: number;
};

export class Location {
  public readonly establishmentId: Id;

  public readonly address: string;

  public readonly num: number;

  public readonly postalCode: string;

  public readonly latitude: number;

  public readonly longitude: number;

  constructor(
    establishmentId: Id,
    address: string,
    num: number,
    postalCode: string,
    latitude: number,
    longitude: number
  ) {
    this.establishmentId = establishmentId;
    this.address = address;
    this.num = num;
    this.postalCode = postalCode;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  public static create(props: LocationProps): Either<PropsAreRequired | FieldIsRequired, Location> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { establishmentId, address, num, postalCode, latitude, longitude } = props;

    if (!establishmentId) {
      return left(new FieldIsRequired('establishmentId'));
    }

    if (!address) {
      return left(new FieldIsRequired('address'));
    }

    if (!num) {
      return left(new FieldIsRequired('num'));
    }

    if (!postalCode) {
      return left(new FieldIsRequired('postalCode'));
    }

    if (!latitude) {
      return left(new FieldIsRequired('latitude'));
    }

    if (!longitude) {
      return left(new FieldIsRequired('longitude'));
    }

    const coordinate = new Location(establishmentId, address, num, postalCode, latitude, longitude);

    return right(coordinate);
  }
}
