import { Either, left, right } from '@shared/utils';

import { FieldIsRequired, MinimumLength, PropsAreRequired } from '@/domain/entities/errors';

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

  public static create(props: PasswordProps): Either<MinimumLength | PropsAreRequired | FieldIsRequired, Password> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { value, isHashed } = props;

    if (!value) {
      return left(new FieldIsRequired('password'));
    }

    if (!isHashed) {
      if (value.length < this.MINIMUM_LENGTH) {
        return left(new MinimumLength(this.MINIMUM_LENGTH));
      }
    }

    const password = new Password(value, !!isHashed);

    return right(password);
  }
}
