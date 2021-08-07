import { Either, left, right } from '@shared/utils';

import { InvalidEmail } from '@/domain/entities/errors';

export type EmailProps = {
  value: string;
};

export class Email {
  public readonly value: string;

  private static readonly regex =
    // eslint-disable-next-line no-useless-escape
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(props: EmailProps): Either<InvalidEmail, Email> {
    if (!props) {
      return left(new InvalidEmail('Props is required'));
    }

    const { value } = props;

    if (!value) {
      return left(new InvalidEmail('Address is required'));
    }

    if (!this.isValid(value)) {
      return left(new InvalidEmail('Address is invalid'));
    }

    return right(new Email(value));
  }

  private static isValid(value: string): boolean {
    return this.regex.test(value);
  }
}
