import { Either, left, right } from '@shared/utils';

import { Email, EmailProps, Password, PasswordProps, Phone, PhoneProps } from '@/domain/entities/values';
import { InvalidEmail, InvalidPassword, InvalidUser, PropsAreRequired } from '@/domain/entities/errors';

type UserProps = {
  name: string;
  email: EmailProps;
  password: PasswordProps;
  phone: PhoneProps;
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

    const emailOrError = Email.create(email);
    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    const passwordOrError = Password.create(password);
    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const phoneOrError = Phone.create(phone);
    if (phoneOrError.isLeft()) {
      return left(phoneOrError.value);
    }

    const user = new User(name, emailOrError.value, passwordOrError.value, phoneOrError.value);

    return right(user);
  }
}
