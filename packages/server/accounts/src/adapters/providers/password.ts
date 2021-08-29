import * as bcrypt from 'bcryptjs';
import { PasswordProvider } from '@/ports/providers';

export class PasswordProviderImpl implements PasswordProvider {
  encode(valueToEncode: string, salt: number): Promise<string> {
    return bcrypt.hash(valueToEncode, salt);
  }

  compare(valueToCompare: string, hash: string): Promise<boolean> {
    return bcrypt.compare(valueToCompare, hash);
  }
}
