import { Either, left, right } from '@shared/utils';
import { Id, Phone } from '@/domain/entities/values';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';

export type EstablishmentProps = {
  id: Id;
  name: string;
  phone: Phone;
  restaurateurId: Id;
};

export class Establishment {
  public readonly id: Id;

  public readonly name: string;

  public readonly phone: Phone;

  public readonly restaurateurId: Id;

  private constructor(id: Id, name: string, phone: Phone, restaurateurId: Id) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.restaurateurId = restaurateurId;
  }

  public static create(props: EstablishmentProps): Either<PropsAreRequired | FieldIsRequired, Establishment> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { id, name, phone, restaurateurId } = props;

    if (!id) {
      return left(new FieldIsRequired('id'));
    }

    if (!name) {
      return left(new FieldIsRequired('name'));
    }

    if (!phone) {
      return left(new FieldIsRequired('phone'));
    }

    if (!restaurateurId) {
      return left(new FieldIsRequired('restaurateurId'));
    }

    const establishment = new Establishment(id, name, phone, restaurateurId);

    return right(establishment);
  }
}
