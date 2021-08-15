import { Either, left, right } from '@shared/utils';

import { Email, Password, Phone } from '@/domain/entities/values';
import { PropsAreRequired, FieldIsRequired } from '@/domain/entities/errors';

type UserProps = {
  name: string;
  email: Email;
  password: Password;
  phone: Phone;
};

export class User {
  public readonly name: string;

  public readonly email: Email;

  public readonly password: Password;

  public readonly phone: Phone;

  private constructor(name: string, email: Email, password: Password, phone: Phone) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }

  public static create(props: UserProps): Either<FieldIsRequired | PropsAreRequired, User> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { name, email, password, phone } = props;

    if (!name) {
      return left(new FieldIsRequired('name'));
    }

    if (!email) {
      return left(new FieldIsRequired('email'));
    }

    if (!password) {
      return left(new FieldIsRequired('password'));
    }

    if (!phone) {
      return left(new FieldIsRequired('phone'));
    }

    const user = new User(name, email, password, phone);

    return right(user);
  }
}
