import { HashingProvider } from '@/domain/factories/ports/hashing-provider';

export class FakeHashingProvider implements HashingProvider {
  async encode(valueToEncode: string, salt: number): Promise<string> {
    return Promise.resolve('hashed_value');
  }

  async compare(valueToCompare: string, hash: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}
