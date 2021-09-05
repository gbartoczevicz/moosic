import { RestaurateurMapper, UserMapper } from '@/adapters/database/prisma/mappers';
import { PrismaRestaurateurRepo, PrismaUsersRepo } from '@/adapters/database/prisma/repositories';
import { DocumentProviderImpl, IdProviderImpl, PasswordProviderImpl, PhoneProviderImpl } from '@/adapters/providers';
import { CreateRestaurateurController } from '@/domain/controllers';
import {
  DocumentFactory,
  IdFactory,
  PasswordFactory,
  PhoneFactory,
  RestaurateurFactory,
  UserFactory
} from '@/domain/factories';
import { CreateRestaurateurUseCase, GetUserUseCase } from '@/domain/use-cases';
import { Factory } from '@/ports/app';

export const makeCreateRestaurateur = (): Factory => {
  const idFactory = new IdFactory(new IdProviderImpl());

  const passwordFactory = new PasswordFactory(new PasswordProviderImpl(), 8);
  const phoneFactory = new PhoneFactory(new PhoneProviderImpl());
  const userFactory = new UserFactory(idFactory, passwordFactory, phoneFactory);
  const userMapper = new UserMapper(userFactory);
  const userRepo = new PrismaUsersRepo(userMapper);

  const documentFactory = new DocumentFactory(new DocumentProviderImpl());
  const restaurateurFactory = new RestaurateurFactory(idFactory, documentFactory);
  const restaurateurMapper = new RestaurateurMapper(restaurateurFactory);
  const restaurateurRepo = new PrismaRestaurateurRepo(restaurateurMapper);

  const getUserUseCase = new GetUserUseCase(userRepo, idFactory);
  const createRestaurateurUseCase = new CreateRestaurateurUseCase(
    restaurateurFactory,
    restaurateurRepo,
    getUserUseCase
  );

  const createRestaurateurController = new CreateRestaurateurController(createRestaurateurUseCase);

  return {
    controller: createRestaurateurController,
    route: '/'
  };
};
