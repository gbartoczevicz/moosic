import { UserMapper } from '@/adapters/database/prisma/mappers';
import { PrismaUsersRepo } from '@/adapters/database/prisma/repositories';
import { IdProviderImpl, JwtProviderImpl, PasswordProviderImpl, PhoneProviderImpl } from '@/adapters/providers';
import { CreateSessionController } from '@/domain/controllers';
import { IdFactory, PasswordFactory, PhoneFactory, UserFactory } from '@/domain/factories';
import { CreateSessionUseCase } from '@/domain/use-cases';
import { Factory } from '@/ports/app';

export const makeCreateSessionController = (): Factory => {
  const idFactory = new IdFactory(new IdProviderImpl());
  const passwordFactory = new PasswordFactory(new PasswordProviderImpl(), 8);
  const phoneFactory = new PhoneFactory(new PhoneProviderImpl());

  const userFactory = new UserFactory(idFactory, passwordFactory, phoneFactory);

  const userMapper = new UserMapper(userFactory);
  const userRepo = new PrismaUsersRepo(userMapper);

  const createSessionUseCase = new CreateSessionUseCase(userRepo, new PasswordProviderImpl(), new JwtProviderImpl(), {
    secret: 'very secret',
    expiresAt: 2
  });

  const createSessionController = new CreateSessionController(createSessionUseCase);

  return {
    route: '/',
    controller: createSessionController
  };
};
