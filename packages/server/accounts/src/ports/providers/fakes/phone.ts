import { PhoneProvider } from '@/ports/providers';

export class FakePhoneProvider implements PhoneProvider {
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
