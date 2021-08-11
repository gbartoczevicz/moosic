import { Either, left, right } from '@shared/utils';

import { Email, EmailProps, Password, PasswordProps } from '@/domain/entities/values';
import { InvalidEmail, InvalidPassword, InvalidUser, PropsAreRequired } from '@/domain/entities/errors';

type UserProps = {
  name: string;
  email: EmailProps;
  password: PasswordProps;
};

export class User {
  public readonly name: string;

  public readonly email: Email;

  public readonly password: Password;

  private constructor(name: string, email: Email, password: Password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  public static create(props: UserProps): Either<InvalidEmail | InvalidPassword | PropsAreRequired, User> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { name, email, password } = props;

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

    const user = new User(name, emailOrError.value, passwordOrError.value);

    return right(user);
  }
}
