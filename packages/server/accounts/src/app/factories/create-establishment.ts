import { EstablishmentMapper, RestaurateurMapper } from '@/adapters/database/prisma/mappers';
import { PrismaEstablishmentsRepo, PrismaRestaurateurRepo } from '@/adapters/database/prisma/repositories';
import { DocumentProviderImpl, IdProviderImpl, PhoneProviderImpl } from '@/adapters/providers';
import { CreateEstablishmentController } from '@/domain/controllers';
import {
  DocumentFactory,
  EstablishmentFactory,
  IdFactory,
  PhoneFactory,
  RestaurateurFactory
} from '@/domain/factories';
import { CreateEstablishmentUseCase, GetRestaurateurUseCase } from '@/domain/use-cases';
import { Factory } from '@/ports/app';

export const makeCreateEstablishment = (): Factory => {
  const idFactory = new IdFactory(new IdProviderImpl());
  const phoneFactory = new PhoneFactory(new PhoneProviderImpl());

  const establishmentFactory = new EstablishmentFactory(idFactory, phoneFactory);
  const establishmentMapper = new EstablishmentMapper(establishmentFactory);
  const establishmentRepo = new PrismaEstablishmentsRepo(establishmentMapper);

  const documentFactory = new DocumentFactory(new DocumentProviderImpl());
  const restaurateurFactory = new RestaurateurFactory(idFactory, documentFactory);
  const restaurateurMapper = new RestaurateurMapper(restaurateurFactory);
  const restaurateurRepo = new PrismaRestaurateurRepo(restaurateurMapper);

  const getRestaurateurUseCase = new GetRestaurateurUseCase(restaurateurRepo, idFactory);

  const createEstablishmentUseCase = new CreateEstablishmentUseCase(
    establishmentFactory,
    establishmentRepo,
    getRestaurateurUseCase
  );

  return {
    route: '/',
    controller: new CreateEstablishmentController(createEstablishmentUseCase)
  };
};
