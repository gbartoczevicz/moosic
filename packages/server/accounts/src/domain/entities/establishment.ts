import { Either, left, right } from '@shared/utils';
import { Phone } from '@/domain/entities/values';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';

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

  public static create(props: EstablishmentProps): Either<PropsAreRequired | FieldIsRequired, Establishment> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { name, phone } = props;

    if (!name) {
      return left(new FieldIsRequired('name'));
    }

    if (!phone) {
      return left(new FieldIsRequired('phone'));
    }

    const establishment = new Establishment(name, phone);

    return right(establishment);
  }
}
