import { Either, left } from '@/utils';

import { User } from '@/domain/entities/user';
import { Email } from '@/domain/entities/values';
import {
  MakePasswordProps,
  PasswordFactory,
  PhoneFactory,
  MakePhoneProps,
  MakeIdProps,
  IdFactory
} from '@/domain/factories';
import { FieldIsRequired, InvalidEmail, MinimumLength, PropsAreRequired } from '@/domain/entities/errors';
import { InvalidPhonePattern } from '@/domain/factories/errors';
import uploadConfig, { StorageDriver } from '@/config/upload';

export type MakeUserProps = {
  id: MakeIdProps;
  name: string;
  email: string;
  password: MakePasswordProps;
  phone: MakePhoneProps;
  avatar?: string;
};

type UserEither = Either<PropsAreRequired | InvalidEmail | MinimumLength | FieldIsRequired | InvalidPhonePattern, User>;

export class UserFactory {
  private readonly idFactory: IdFactory;

  private readonly passwordFactory: PasswordFactory;

  private readonly phoneFactory: PhoneFactory;

  public constructor(idFactory: IdFactory, passwordFactory: PasswordFactory, phoneFactory: PhoneFactory) {
    this.idFactory = idFactory;
    this.passwordFactory = passwordFactory;
    this.phoneFactory = phoneFactory;
  }

  public async make(props: MakeUserProps): Promise<UserEither> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { id, name, email, password, phone, avatar } = props;

    const idOrError = this.idFactory.make(id);

    if (idOrError.isLeft()) {
      return left(idOrError.value);
    }

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
      id: idOrError.value,
      name,
      email: emailOrError.value,
      password: passwordOrError.value,
      phone: phoneOrError.value,
      avatar: avatar ? `${this.getUrl()}/${avatar}` : undefined
    });

    return userOrError;
  }

  private getUrl(): string {
    let url: string;

    switch (uploadConfig.storageDriver) {
      case StorageDriver.disk:
        url = `http://localhost:${uploadConfig.drivers[StorageDriver.disk].port}/files`;
        break;
      case StorageDriver.s3:
        const { /* region // workaround, */ bucket } = uploadConfig.drivers[StorageDriver.s3];
        url = `https://S3.us-west-1.amazonaws.com/${bucket}`;
        break;
      default:
        throw new Error(`Driver ${uploadConfig.storageDriver} is invalid`);
    }

    return url;
  }
}
