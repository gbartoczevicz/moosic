import { PasswordProvider } from '@/ports/providers';

export class FakePasswordProvider implements PasswordProvider {
  async encode(valueToEncode: string, salt: number): Promise<string> {
    return Promise.resolve('hashed_value');
  }

  async compare(valueToCompare: string, hash: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}
