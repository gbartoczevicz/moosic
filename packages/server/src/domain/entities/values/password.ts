import { Either, left, right } from '@shared/utils';

import { InvalidPassword } from '@/domain/entities/errors';

export type PasswordProps = {
  value: string;
  isHashed?: boolean;
};

export class Password {
  public readonly value: string;

  public readonly isHashed: boolean;

  public static readonly MINIMUM_LENGTH = 8;

  private constructor(value: string, isHashed: boolean) {
    this.value = value;
    this.isHashed = isHashed;
  }

  public static create(props: PasswordProps): Either<InvalidPassword, Password> {
    if (!props) {
      return left(new InvalidPassword('Props is required'));
    }

    const { value, isHashed } = props;

    if (!value) {
      return left(new InvalidPassword('Password is required'));
    }

    if (value.length < this.MINIMUM_LENGTH) {
      return left(new InvalidPassword(`The minimum length for password is ${this.MINIMUM_LENGTH}`));
    }

    const password = new Password(value, !!isHashed);

    return right(password);
  }
}
