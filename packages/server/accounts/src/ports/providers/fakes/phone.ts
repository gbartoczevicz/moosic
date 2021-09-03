import { PhoneProvider } from '@/ports/providers';

export class FakePhoneProvider implements PhoneProvider {
  public sanitize(value: string): string {
    return 'sanitized';
  }

  public validate(value: string): boolean {
    return true;
  }
}
