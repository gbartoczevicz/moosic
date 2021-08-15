import { Either, left, right } from '@shared/utils';

import { Email, Password, Phone } from '@/domain/entities/values';
import { InvalidEmail, InvalidPassword, InvalidUser, PropsAreRequired } from '@/domain/entities/errors';

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

  public static create(props: UserProps): Either<InvalidEmail | InvalidPassword | PropsAreRequired, User> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { name, email, password, phone } = props;

    if (!name) {
      return left(new InvalidUser('Name is required'));
    }

    if (!email) {
      return left(new InvalidUser('Email is required'));
    }

    if (!password) {
      return left(new InvalidUser('Password is required'));
    }

    if (!phone) {
      return left(new InvalidUser('Phone is required'));
    }

    const user = new User(name, email, password, phone);

    return right(user);
  }
}
