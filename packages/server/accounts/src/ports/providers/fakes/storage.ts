import { StorageProvider } from '@/ports/providers';

export class FakeStorageProvider implements StorageProvider {
  public async save(filename: string): Promise<string> {
    return Promise.resolve(filename);
  }

  public async delete(filename: string): Promise<void> {
    return Promise.resolve();
  }
}
