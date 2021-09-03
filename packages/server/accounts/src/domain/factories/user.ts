import { Either, left } from '@shared/utils';

import { User } from '@/domain/entities/user';
import { Email } from '@/domain/entities/values';
import {
  MakePasswordProps,
  PasswordFactory,
  PhoneFactory,
  MakePhoneProps,
  MakeIdProps,
  IdFactory
} from '@/domain/factories';
import { FieldIsRequired, InvalidEmail, MinimumLength, PropsAreRequired } from '@/domain/entities/errors';
import { InvalidPhonePattern } from '@/domain/factories/errors';

export type MakeUserProps = {
  id: MakeIdProps;
  name: string;
  email: string;
  password: MakePasswordProps;
  phone: MakePhoneProps;
};

type UserEither = Either<PropsAreRequired | InvalidEmail | MinimumLength | FieldIsRequired | InvalidPhonePattern, User>;

export class UserFactory {
  private readonly idFactory: IdFactory;

  private readonly passwordFactory: PasswordFactory;

  private readonly phoneFactory: PhoneFactory;

  public constructor(idFactory: IdFactory, passwordFactory: PasswordFactory, phoneFactory: PhoneFactory) {
    this.idFactory = idFactory;
    this.passwordFactory = passwordFactory;
    this.phoneFactory = phoneFactory;
  }

  public async make(props: MakeUserProps): Promise<UserEither> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { id, name, email, password, phone } = props;

    const idOrError = this.idFactory.make(id);

    if (idOrError.isLeft()) {
      return left(idOrError.value);
    }

    const emailOrError = Email.create({
      value: email
    });

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    const passwordOrError = await this.passwordFactory.make(password);

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const phoneOrError = this.phoneFactory.make(phone);

    if (phoneOrError.isLeft()) {
      return left(phoneOrError.value);
    }

    const userOrError = User.create({
      id: idOrError.value,
      name,
      email: emailOrError.value,
      password: passwordOrError.value,
      phone: phoneOrError.value
    });

    return userOrError;
  }
}
