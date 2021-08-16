import { PhoneNumber } from '@/domain/services/ports';

export class FakePhoneNumber implements PhoneNumber {
  public format(value: string): string {
    return 'formatted phone number';
  }

  public sanitize(value: string): string {
    return 'sanitized phone number';
  }

  public validate(value: string): boolean {
    return true;
  }
}
