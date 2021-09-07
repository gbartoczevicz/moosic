import { Either, left } from '@/utils';
import { PhoneProvider } from '@/ports/providers';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';
import { InvalidPhonePattern } from '@/domain/factories/errors';
import { Phone } from '@/domain/entities/values';

export type MakePhoneProps = {
  value: string;
};

export class PhoneFactory {
  private readonly phoneProvider: PhoneProvider;

  public constructor(phoneProvider: PhoneProvider) {
    this.phoneProvider = phoneProvider;
  }

  public make(props: MakePhoneProps): Either<PropsAreRequired | InvalidPhonePattern | FieldIsRequired, Phone> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { value } = props;

    if (!this.phoneProvider.validate(value)) {
      return left(new InvalidPhonePattern());
    }

    return Phone.create({
      value: this.phoneProvider.sanitize(value)
    });
  }
}
