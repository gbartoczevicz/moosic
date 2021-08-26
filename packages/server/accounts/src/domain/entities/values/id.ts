import { Either, left, right } from '@shared/utils';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';

export type IdProps = {
  value: string;
};

export class Id {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static crate(props: IdProps): Either<PropsAreRequired | FieldIsRequired, Id> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { value } = props;

    if (!value) {
      return left(new FieldIsRequired('value'));
    }

    return right(new Id(value));
  }

  public equals(toCompare: Id | string): boolean {
    if (!toCompare) {
      return false;
    }

    if (typeof toCompare === 'string') {
      return toCompare === this.value;
    }

    return this.value === toCompare.value;
  }
}
