import jwtConfig from '@/config/jwt';

import * as UseCases from '@/domain/use-cases';
import * as Repositories from '@/app/factories/repositories';
import * as Domain from '@/app/factories/domain';
import * as Providers from '@/app/factories/providers';

export const createUserUseCase = new UseCases.CreateUserUseCase(Domain.userFactory, Repositories.usersRepo);

export const getUserUseCase = new UseCases.GetUserUseCase(Repositories.usersRepo, Domain.idFactory);

export const createArtistUseCase = new UseCases.CreateArtistUseCase(
  Domain.artistFactory,
  Repositories.artistsRepo,
  getUserUseCase
);

export const createRestaurateurUseCase = new UseCases.CreateRestaurateurUseCase(
  Domain.restaurateurFactory,
  Repositories.restaurateurRepo,
  getUserUseCase
);

export const getRestaurateurUseCase = new UseCases.GetRestaurateurUseCase(
  Repositories.restaurateurRepo,
  Domain.idFactory
);

export const createEstablishmentUseCase = new UseCases.CreateEstablishmentUseCase(
  Domain.establishmentFactory,
  Repositories.establishmentsRepo
);

export const createSessionUseCase = new UseCases.CreateSessionUseCase(
  Repositories.usersRepo,
  Providers.passwordProvider,
  Providers.jwtProvider,
  { expiresAt: jwtConfig.expiresIn, secret: jwtConfig.secret }
);

export const setSessionUseCase = new UseCases.SetSessionUseCase(
  Providers.jwtProvider,
  Domain.idFactory,
  jwtConfig.secret
);

export const upsertLocationUseCase = new UseCases.UpsertLocationUseCase(
  Repositories.locationsRepo,
  Repositories.establishmentsRepo,
  Domain.locationFactory
);
