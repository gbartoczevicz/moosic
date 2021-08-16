import { Either, left } from '@shared/utils';
import { PhoneNumber } from '@/domain/services/ports';
import { Phone } from '@/domain/entities/values';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';
import { InvalidPhonePattern } from '@/domain/services/errors';

export class PhoneService {
  private readonly phoneNumber: PhoneNumber;

  public constructor(phoneNumber: PhoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public createFromPlainValue(
    plainValue: string,
    toSanitize: boolean
  ): Either<InvalidPhonePattern | PropsAreRequired | FieldIsRequired, Phone> {
    if (!this.phoneNumber.validate(plainValue)) {
      return left(new InvalidPhonePattern());
    }

    const value = toSanitize ? this.phoneNumber.sanitize(plainValue) : this.phoneNumber.format(plainValue);

    const phone = Phone.create({
      value,
      isSanitized: toSanitize
    });

    return phone;
  }
}
