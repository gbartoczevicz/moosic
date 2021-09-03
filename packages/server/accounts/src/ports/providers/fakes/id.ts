import { IdProvider } from '@/ports/providers';

export class FakeIdProvider implements IdProvider {
  public generate(value?: string): string {
    return 'generated';
  }
}
