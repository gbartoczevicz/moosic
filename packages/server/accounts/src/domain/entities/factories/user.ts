import { left, right } from '@shared/utils';
import { HashService } from '@/domain/services/hash';
import { PhoneService } from '@/domain/services/phone';
import { Email, Password } from '@/domain/entities/values';
import { PropsAreRequired } from '@/domain/entities/errors';
import { User } from '@/domain/entities/user';

export type MakeUserProps = {
  name: string;
  email: string;
  password: { value: string; toEncode: boolean };
  phone: { value: string; toSanitize: boolean };
};

export class UserFactory {
  private readonly hashService: HashService;

  private readonly phoneService: PhoneService;

  public constructor(hashService: HashService, phoneService: PhoneService) {
    this.hashService = hashService;
    this.phoneService = phoneService;
  }

  public async make(props: MakeUserProps) {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { name, email, password, phone } = props;

    const emailOrError = Email.create({
      value: email
    });

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    let toCreatePassword: string;

    if (password.toEncode) {
      toCreatePassword = await this.hashService.encodePlain(password.value);
    } else {
      toCreatePassword = password.value;
    }

    const passwordOrError = Password.create({
      value: toCreatePassword,
      isHashed: password.toEncode
    });

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const phoneOrError = this.phoneService.createFromPlainValue(phone.value, phone.toSanitize);

    if (phoneOrError.isLeft()) {
      return left(phoneOrError.value);
    }

    const userOrError = User.create({
      name,
      email: emailOrError.value,
      password: passwordOrError.value,
      phone: phoneOrError.value
    });

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    return right(userOrError.value);
  }
}
