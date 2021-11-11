import { UserFactory } from '@/domain/factories';
import { User } from '@/domain/entities';
import uploadConfig, { StorageDriver } from '@/config/upload';

export class GetUserWithAvatarUrlService {
  private readonly userFactory: UserFactory;

  public constructor(userFactory: UserFactory) {
    this.userFactory = userFactory;
  }

  public async execute(user: User): Promise<User> {
    if (!user.avatar) return user;

    const { avatar, ...delegate } = user;

    const parsedAvatar = `${this.getUrl()}/${avatar}`;

    const userOrError = await this.userFactory.make({
      id: { value: delegate.id.value },
      name: delegate.name,
      email: delegate.email.value,
      phone: { value: delegate.phone.value },
      password: { value: delegate.password.value, toEncode: false },
      avatar: parsedAvatar
    });

    return userOrError.value as User;
  }

  private getUrl(): string {
    let url: string;

    switch (uploadConfig.storageDriver) {
      case StorageDriver.disk:
        url = `http://localhost:${uploadConfig.drivers[StorageDriver.disk].port}/files`;
        break;
      case StorageDriver.s3:
        const { region, bucket } = uploadConfig.drivers[StorageDriver.s3];
        url = `https://S3.${region}.amazonaws.com/${bucket}`;
        break;
      default:
        throw new Error(`Driver ${uploadConfig.storageDriver} is invalid`);
    }

    return url;
  }
}
