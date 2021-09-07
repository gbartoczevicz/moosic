import { ArtistMapper, UserMapper } from '@/adapters/database/prisma/mappers';
import { PrismaArtistsRepo, PrismaUsersRepo } from '@/adapters/database/prisma/repositories';
import { DocumentProviderImpl, IdProviderImpl, PasswordProviderImpl, PhoneProviderImpl } from '@/adapters/providers';
import { CreateArtistController } from '@/domain/controllers';
import {
  DocumentFactory,
  IdFactory,
  PasswordFactory,
  PhoneFactory,
  ArtistFactory,
  UserFactory
} from '@/domain/factories';
import { CreateArtistUseCase, GetUserUseCase } from '@/domain/use-cases';
import { Factory } from '@/ports/app';

export const makeCreateArtist = (): Factory => {
  const idFactory = new IdFactory(new IdProviderImpl());

  const passwordFactory = new PasswordFactory(new PasswordProviderImpl(), 8);
  const phoneFactory = new PhoneFactory(new PhoneProviderImpl());
  const userFactory = new UserFactory(idFactory, passwordFactory, phoneFactory);
  const userMapper = new UserMapper(userFactory);
  const userRepo = new PrismaUsersRepo(userMapper);

  const documentFactory = new DocumentFactory(new DocumentProviderImpl());
  const artistFactory = new ArtistFactory(idFactory, documentFactory);
  const artistMapper = new ArtistMapper(artistFactory);
  const artistsRepo = new PrismaArtistsRepo(artistMapper);

  const getUserUseCase = new GetUserUseCase(userRepo, idFactory);
  const areateArtistUseCase = new CreateArtistUseCase(artistFactory, artistsRepo, getUserUseCase);

  const createArtistController = new CreateArtistController(areateArtistUseCase);

  return {
    controller: createArtistController,
    route: '/'
  };
};
