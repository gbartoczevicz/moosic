import { Either } from '@/utils';
import { Password } from '@/domain/entities/values';
import { PasswordProvider } from '@/ports/providers';
import { FieldIsRequired, MinimumLength, PropsAreRequired } from '@/domain/entities/errors';

export type MakePasswordProps = {
  value: string;
  toEncode: boolean;
};

type PasswordEither = Either<MinimumLength | PropsAreRequired | FieldIsRequired, Password>;

export class PasswordFactory {
  private readonly passwordProvider: PasswordProvider;

  private readonly salt: number;

  public constructor(passwordProvider: PasswordProvider, salt: number) {
    this.passwordProvider = passwordProvider;
    this.salt = salt;
  }

  public async make(props: MakePasswordProps): Promise<PasswordEither> {
    const value = props.toEncode ? await this.passwordProvider.encode(props.value, this.salt) : props.value;

    return Password.create({
      value,
      isHashed: props.toEncode
    });
  }
}
