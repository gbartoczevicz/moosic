import { v4 as uuidv4 } from 'uuid';

import { IdProvider } from '@/ports/providers';

export class IdProviderImpl implements IdProvider {
  public generate(value?: string): string {
    return value ?? uuidv4();
  }
}
