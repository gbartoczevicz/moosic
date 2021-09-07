import { Either, left } from '@/utils';
import { IdFactory, PhoneFactory, MakeIdProps, MakePhoneProps } from '@/domain/factories';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';
import { Establishment } from '@/domain/entities';
import { InvalidPhonePattern } from '@/domain/factories/errors';

export type MakeEstablishmentProps = {
  id: MakeIdProps;
  name: string;
  phone: MakePhoneProps;
  restaurateurId: MakeIdProps;
};

type EstablishmentEither = Either<PropsAreRequired | FieldIsRequired | InvalidPhonePattern, Establishment>;

export class EstablishmentFactory {
  private readonly idFactory: IdFactory;

  private readonly phoneFactory: PhoneFactory;

  public constructor(idFactory: IdFactory, phoneFactory: PhoneFactory) {
    this.idFactory = idFactory;
    this.phoneFactory = phoneFactory;
  }

  public make(props: MakeEstablishmentProps): EstablishmentEither {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { id, name, phone, restaurateurId } = props;

    const idOrError = this.idFactory.make(id);

    if (idOrError.isLeft()) {
      return left(idOrError.value);
    }

    const restaurateurIdOrError = this.idFactory.make(restaurateurId);

    if (restaurateurIdOrError.isLeft()) {
      return left(restaurateurIdOrError.value);
    }

    const phoneOrError = this.phoneFactory.make(phone);

    if (phoneOrError.isLeft()) {
      return left(phoneOrError.value);
    }

    return Establishment.create({
      id: idOrError.value,
      name,
      phone: phoneOrError.value,
      restaurateurId: restaurateurIdOrError.value
    });
  }
}
