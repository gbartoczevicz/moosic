import { left, right } from '@shared/utils';

import { User } from '@/domain/entities/user';
import { Email } from '@/domain/entities/values';
import { PhoneService } from '@/domain/services/phone';
import { MakePasswordProps, PasswordFactory } from '@/domain/factories';
import { PropsAreRequired } from '@/domain/entities/errors';

export type MakeUserProps = {
  name: string;
  email: string;
  password: MakePasswordProps;
  phone: { value: string; toSanitize: boolean };
};

export class UserFactory {
  private readonly passwordFactory: PasswordFactory;

  private readonly phoneService: PhoneService;

  public constructor(passwordFactory: PasswordFactory, phoneService: PhoneService) {
    this.passwordFactory = passwordFactory;
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

    const passwordOrError = await this.passwordFactory.make(password);

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
