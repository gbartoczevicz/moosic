import * as UseCases from '@/app/factories/use-cases';
import * as Controllers from '@/domain/controllers';

export const createSessionController = new Controllers.CreateSessionController(UseCases.createSessionUseCase);
export const createUserController = new Controllers.CreateUserController(UseCases.createUserUseCase);
export const createRestaurateurControlle = new Controllers.CreateRestaurateurController(
  UseCases.createRestaurateurUseCase
);
export const createEstablishmentController = new Controllers.CreateEstablishmentController(
  UseCases.createEstablishmentUseCase
);
export const createArtistController = new Controllers.CreateArtistController(UseCases.createArtistUseCase);
export const upsertLocationController = new Controllers.UpsertLocationController(UseCases.upsertLocationUseCase);
