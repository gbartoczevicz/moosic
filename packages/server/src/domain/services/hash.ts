import { Password } from '@/domain/entities/values';
import { HashingProvider } from '@/domain/services/ports';

export class HashService {
  private readonly hashingProvider: HashingProvider;

  private readonly salt: number;

  public constructor(hashingProvider: HashingProvider, salt: number) {
    this.hashingProvider = hashingProvider;
    this.salt = salt;
  }

  async encodePlain(plain: string): Promise<string> {
    return this.hashingProvider.encode(plain, this.salt);
  }

  async comparePlainWithHashed(plain: string, hashedPassword: Password): Promise<boolean> {
    if (!hashedPassword.isHashed) {
      return Promise.resolve(plain === hashedPassword.value);
    }

    return this.hashingProvider.compare(plain, hashedPassword.value);
  }
}
