import * as Ports from '@/ports/providers';
import * as Adapters from '@/adapters/providers';

export const idProvider: Ports.IdProvider = new Adapters.IdProviderImpl();
export const passwordProvider: Ports.PasswordProvider = new Adapters.PasswordProviderImpl();
export const documentProvider: Ports.DocumentProvider = new Adapters.DocumentProviderImpl();
export const phoneProvider: Ports.PhoneProvider = new Adapters.PhoneProviderImpl();
export const jwtProvider: Ports.JwtProvider = new Adapters.JwtProviderImpl();
