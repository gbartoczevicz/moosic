import { User as Persistence } from '@prisma/client';
import { UserFactory } from '@/domain/factories';
import { User } from '@/domain/entities';

export class UserMapper {
  private userFactory: UserFactory;

  public constructor(userFactory: UserFactory) {
    this.userFactory = userFactory;
  }

  public async toDomain(persistence: Persistence): Promise<User> {
    const domain = await this.userFactory.make({
      id: { value: persistence.id },
      name: persistence.name,
      email: persistence.email,
      password: {
        value: persistence.password,
        toEncode: false
      },
      phone: {
        value: persistence.phone,
      }
    });

    if (domain.isLeft()) {
      throw domain.value;
    }

    return domain.value;
  }

  public toPersistence(domain: User): Persistence {
    const persistence: Persistence = {
      id: domain.id.value,
      name: domain.name,
      email: domain.email.value,
      password: domain.password.value,
      phone: domain.phone.value
    };

    return persistence;
  }
}
