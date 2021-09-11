import * as Ports from '@/ports/database';
import * as Adapters from '@/adapters/database/prisma/repositories';
import * as Mappers from '@/adapters/database/prisma/mappers';

import * as Domain from '@/app/factories/domain';

const userMapper = new Mappers.UserMapper(Domain.userFactory);
const artistMapper = new Mappers.ArtistMapper(Domain.artistFactory);
const establishmentMapper = new Mappers.EstablishmentMapper(Domain.establishmentFactory);
const restaurateurMapper = new Mappers.RestaurateurMapper(Domain.restaurateurFactory);

export const usersRepo: Ports.UsersRepo = new Adapters.PrismaUsersRepo(userMapper);
export const artistsRepo: Ports.ArtistsRepo = new Adapters.PrismaArtistsRepo(artistMapper);
export const establishmentsRepo: Ports.EstablishmentsRepo = new Adapters.PrismaEstablishmentsRepo(establishmentMapper);
export const restaurateurRepo: Ports.RestaurateurRepo = new Adapters.PrismaRestaurateurRepo(restaurateurMapper);
