import { Password } from '@/domain/entities/values';
import { HashingProvider } from '@/domain/factories/ports';

export type MakePasswordProps = {
  value: string;
  toEncode: boolean;
};

export class PasswordFactory {
  private readonly hashingProvider: HashingProvider;

  private readonly salt: number;

  public constructor(hashingProvider: HashingProvider, salt: number) {
    this.hashingProvider = hashingProvider;
    this.salt = salt;
  }

  public async make(props: MakePasswordProps) {
    const value = props.toEncode ? await this.hashingProvider.encode(props.value, this.salt) : props.value;

    return Password.create({
      value,
      isHashed: props.toEncode
    });
  }
}
