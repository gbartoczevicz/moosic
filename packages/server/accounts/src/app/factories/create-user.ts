import { UserMapper } from '@/adapters/database/prisma/mappers';
import { PrismaUsersRepo } from '@/adapters/database/prisma/repositories';
import { IdProviderImpl, PasswordProviderImpl, PhoneProviderImpl } from '@/adapters/providers';
import { CreateUserController } from '@/domain/controllers';
import { IdFactory, PasswordFactory, PhoneFactory, UserFactory } from '@/domain/factories';
import { CreateUserUseCase } from '@/domain/use-cases';
import { Factory } from '@/ports/app';

export const makeCreateUser = (): Factory => {
  const idFactory = new IdFactory(new IdProviderImpl());
  const passwordFactory = new PasswordFactory(new PasswordProviderImpl(), 8);
  const phoneFactory = new PhoneFactory(new PhoneProviderImpl());

  const userFactory = new UserFactory(idFactory, passwordFactory, phoneFactory);

  const userMapper = new UserMapper(userFactory);
  const userRepo = new PrismaUsersRepo(userMapper);

  const createUserUseCase = new CreateUserUseCase(userFactory, userRepo);

  const createUserController = new CreateUserController(createUserUseCase);

  return {
    route: '/',
    controller: createUserController
  };
};
