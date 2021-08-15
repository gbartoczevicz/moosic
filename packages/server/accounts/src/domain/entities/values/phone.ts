import { Either, left, right } from '@shared/utils';

import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';

export type PhoneProps = {
  value: string;
  isSanitized?: boolean;
};

export class Phone {
  public readonly value: string;

  public readonly isSanitized: boolean;

  private constructor(value: string, isSanitized: boolean) {
    this.value = value;
    this.isSanitized = isSanitized;
  }

  public static create(props: PhoneProps): Either<PropsAreRequired | FieldIsRequired, Phone> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { value, isSanitized } = props;

    if (!value) {
      return left(new FieldIsRequired('phone'));
    }

    return right(new Phone(value, !!isSanitized));
  }
}
