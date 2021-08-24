import { Either } from '@shared/utils';
import { Password } from '@/domain/entities/values';
import { HashingProvider } from '@/domain/factories/ports';
import { FieldIsRequired, MinimumLength, PropsAreRequired } from '@/domain/entities/errors';

export type MakePasswordProps = {
  value: string;
  toEncode: boolean;
};

type PasswordEither = Either<MinimumLength | PropsAreRequired | FieldIsRequired, Password>;

export class PasswordFactory {
  private readonly hashingProvider: HashingProvider;

  private readonly salt: number;

  public constructor(hashingProvider: HashingProvider, salt: number) {
    this.hashingProvider = hashingProvider;
    this.salt = salt;
  }

  public async make(props: MakePasswordProps): Promise<PasswordEither> {
    const value = props.toEncode ? await this.hashingProvider.encode(props.value, this.salt) : props.value;

    return Password.create({
      value,
      isHashed: props.toEncode
    });
  }
}
