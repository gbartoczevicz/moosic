import { Either, left, right } from '@shared/utils';
import { Phone } from '@/domain/entities/values';
import { InvalidEstablishment, PropsAreRequired } from '@/domain/entities/errors';

export type EstablishmentProps = {
  name: string;
  phone: Phone;
};

export class Establishment {
  public readonly name: string;

  public readonly phone: Phone;

  private constructor(name: string, phone: Phone) {
    this.name = name;
    this.phone = phone;
  }

  public static create(props: EstablishmentProps): Either<PropsAreRequired | InvalidEstablishment, Establishment> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { name, phone } = props;

    if (!name) {
      return left(new InvalidEstablishment('Name is required'));
    }

    if (!phone) {
      return left(new InvalidEstablishment('Phone is required'));
    }

    const establishment = new Establishment(name, phone);

    return right(establishment);
  }
}
