import { Either, left, right } from '@shared/utils';

import { Email } from '@/domain/entities/values';
import { InvalidEmail, InvalidUser } from '@/domain/entities/errors';

type UserProps = {
  email: string;
};

export class User {
  public readonly email: Email;

  private constructor(email: Email) {
    this.email = email;
  }

  public static create(props: UserProps): Either<InvalidUser | InvalidEmail, User> {
    if (!props) {
      return left(new InvalidUser('Props is required'));
    }

    const emailOrError = Email.create({ value: props.email });

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    const user = new User(emailOrError.value);

    return right(user);
  }
}
