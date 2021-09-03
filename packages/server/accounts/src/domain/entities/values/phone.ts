import { Either, left, right } from '@shared/utils';

import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';

export type PhoneProps = {
  value: string;
};

export class Phone {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(props: PhoneProps): Either<PropsAreRequired | FieldIsRequired, Phone> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { value } = props;

    if (!value) {
      return left(new FieldIsRequired('phone'));
    }

    return right(new Phone(value));
  }
}
