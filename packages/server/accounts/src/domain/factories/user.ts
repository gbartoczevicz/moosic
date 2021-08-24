import { left, right } from '@shared/utils';

import { User } from '@/domain/entities/user';
import { Email } from '@/domain/entities/values';
import { MakePasswordProps, PasswordFactory, PhoneFactory, MakePhoneProps } from '@/domain/factories';
import { PropsAreRequired } from '@/domain/entities/errors';

export type MakeUserProps = {
  name: string;
  email: string;
  password: MakePasswordProps;
  phone: MakePhoneProps;
};

export class UserFactory {
  private readonly passwordFactory: PasswordFactory;

  private readonly phoneFactory: PhoneFactory;

  public constructor(passwordFactory: PasswordFactory, phoneFactory: PhoneFactory) {
    this.passwordFactory = passwordFactory;
    this.phoneFactory = phoneFactory;
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

    const phoneOrError = this.phoneFactory.make(phone);

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
