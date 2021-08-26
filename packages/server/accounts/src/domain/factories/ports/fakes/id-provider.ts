import { IdProvider } from '@/domain/factories/ports';

export class FakeIdProvider implements IdProvider {
  public generate(value?: string): string {
    return 'generated';
  }
}
