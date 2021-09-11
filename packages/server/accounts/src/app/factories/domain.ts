import * as Providers from '@/app/factories/providers';
import * as Factories from '@/domain/factories';

export const idFactory = new Factories.IdFactory(Providers.idProvider);
export const passwordFactory = new Factories.PasswordFactory(Providers.passwordProvider, 8);
export const phoneFactory = new Factories.PhoneFactory(Providers.phoneProvider);
export const documentFactory = new Factories.DocumentFactory(Providers.documentProvider);

export const userFactory = new Factories.UserFactory(idFactory, passwordFactory, phoneFactory);
export const artistFactory = new Factories.ArtistFactory(idFactory, documentFactory);
export const restaurateurFactory = new Factories.RestaurateurFactory(idFactory, documentFactory);
export const establishmentFactory = new Factories.EstablishmentFactory(idFactory, phoneFactory);
