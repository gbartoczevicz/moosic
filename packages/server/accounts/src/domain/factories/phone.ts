import { left } from '@shared/utils';
import { PhoneNumber } from '@/domain/factories/ports';
import { PropsAreRequired } from '@/domain/entities/errors';
import { InvalidPhonePattern } from '@/domain/factories/errors';
import { Phone } from '@/domain/entities/values';

export type MakePhoneProps = {
  value: string;
  toSanitize: boolean;
};

export class PhoneFactory {
  private readonly phoneNumber: PhoneNumber;

  public constructor(phoneNumber: PhoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public make(props: MakePhoneProps) {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { value, toSanitize } = props;

    if (!this.phoneNumber.validate(value)) {
      return left(new InvalidPhonePattern());
    }

    return Phone.create({
      value: toSanitize ? this.phoneNumber.sanitize(value) : this.phoneNumber.format(value),
      isSanitized: toSanitize
    });
  }
}
