import { IdProviderImpl, JwtProviderImpl } from '@/adapters/providers';
import { IdFactory } from '@/domain/factories';
import { SetSessionUseCase } from '@/domain/use-cases';

export const makeSetSessionMiddleware = () => {
  const jwtProvider = new JwtProviderImpl();

  const idFactory = new IdFactory(new IdProviderImpl());

  return {
    middleware: new SetSessionUseCase(jwtProvider, idFactory, 'very secret')
  };
};
