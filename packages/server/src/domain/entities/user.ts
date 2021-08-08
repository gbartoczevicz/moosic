import { Either, left, right } from '@shared/utils';

import { Email, EmailProps, Password, PasswordProps } from '@/domain/entities/values';
import { InvalidEmail, InvalidPassword, PropsAreRequired } from '@/domain/entities/errors';

type UserProps = {
  email: EmailProps;
  password: PasswordProps;
};

export class User {
  public readonly email: Email;

  public readonly password: Password;

  private constructor(email: Email, password: Password) {
    this.email = email;
    this.password = password;
  }

  public static create(props: UserProps): Either<InvalidEmail | InvalidPassword | PropsAreRequired, User> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { email, password } = props;

    const emailOrError = Email.create(email);
    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    const passwordOrError = Password.create(password);
    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const user = new User(emailOrError.value, passwordOrError.value);

    return right(user);
  }
}
