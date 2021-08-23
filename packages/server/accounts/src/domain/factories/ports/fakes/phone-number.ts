import { PhoneNumber } from '@/domain/factories/ports';

export class FakePhoneNumber implements PhoneNumber {
  public format(value: string): string {
    return 'formatted';
  }

  public sanitize(value: string): string {
    return 'sanitized';
  }

  public validate(value: string): boolean {
    return true;
  }
}
