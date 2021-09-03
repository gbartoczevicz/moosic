import * as Validator from 'libphonenumber-js';
import { PhoneProvider } from '@/ports/providers';

export class PhoneProviderImpl implements PhoneProvider {
  public validate(value: string): boolean {
    return Validator.isValidNumberForRegion(value, 'BR');
  }

  public sanitize(value: string): string {
    return Validator.parseDigits(value);
  }
}
