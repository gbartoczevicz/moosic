import { FakeRestaurateurRepo } from '@/ports/database/fakes';
import { IdFactory } from '@/domain/factories';
import { FakeIdProvider } from '@/ports/providers/fakes';
import { GetRestaurateurUseCase } from '@/domain/use-cases';
import { Restaurateur } from '@/domain/entities';
import { left, right } from '@shared/utils';
import { PropsAreRequired } from '@/domain/entities/errors';
import { RestaurateurNotFound } from '@/domain/use-cases/errors';
import { InfraError } from '@/ports/errors';

const USER_ID = 'to_find_restaurateur';

const makeSut = () => {
  const idFactory = new IdFactory(new FakeIdProvider());
  const restaurateurRepo = new FakeRestaurateurRepo();

  return {
    sut: new GetRestaurateurUseCase(restaurateurRepo, idFactory),
    restaurateurRepo,
    idFactory
  };
};

describe('GetRestaurateurUseCase Unitary Tests', () => {
  it('should get a valid restaurateur', async () => {
    const { sut } = makeSut();

    const testable = await sut.execute({ userId: USER_ID });

    expect(testable.isRight()).toBeTruthy();

    const restaurateur = testable.value as Restaurateur;

    expect(restaurateur.userId.value).toEqual(USER_ID);
  });

  it('should return left when user is not found', async () => {
    const { sut, restaurateurRepo } = makeSut();

    jest.spyOn(restaurateurRepo, 'findByUserId').mockImplementation(() => Promise.resolve(right(null)));

    const testable = await sut.execute({ userId: USER_ID });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(RestaurateurNotFound);
  });

  it('should validate id factory', async () => {
    const { sut, idFactory } = makeSut();

    jest.spyOn(idFactory, 'make').mockImplementation(() => left(new PropsAreRequired()));

    const testable = await sut.execute({ userId: USER_ID });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate infra error', async () => {
    const { sut, restaurateurRepo } = makeSut();

    jest.spyOn(restaurateurRepo, 'findByUserId').mockImplementation(() => Promise.resolve(left(new InfraError('any'))));

    const testable = await sut.execute({ userId: USER_ID });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(InfraError);
  });
});
