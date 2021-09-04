import { left, right } from '@shared/utils';
import { CreateRestaurateurUseCase } from '@/domain/use-cases';
import { FakeDocumentProvider, FakeIdProvider } from '@/ports/providers/fakes';
import { Restaurateur } from '@/domain/entities';
import { DocumentFactory, IdFactory, RestaurateurFactory } from '@/domain/factories';
import { FakeRestaurateurRepo } from '@/ports/database/fakes';
import { CreateRestaurateurDTO } from '@/domain/use-cases/dtos';
import { PropsAreRequired } from '@/domain/entities/errors';
import { DocumentAlreadyInUse } from '@/domain/use-cases/errors';
import { InfraError } from '@/ports/errors';

const makeSut = () => {
  const restaurateurFactory = new RestaurateurFactory(
    new IdFactory(new FakeIdProvider()),
    new DocumentFactory(new FakeDocumentProvider())
  );

  const restaurateurRepo = new FakeRestaurateurRepo();

  return {
    sut: new CreateRestaurateurUseCase(restaurateurFactory, restaurateurRepo),
    restaurateurFactory,
    restaurateurRepo
  };
};

const makeFixture = (): CreateRestaurateurDTO => ({
  document: { type: 'CNPJ', value: 'document' },
  userId: 'user_id'
});

describe('Create Restaurateur Unitary Test', () => {
  it('should create a valid restaurateur', async () => {
    const { sut, restaurateurFactory, restaurateurRepo } = makeSut();

    jest.spyOn(restaurateurFactory, 'make').mockImplementation(() => right({} as Restaurateur));
    jest.spyOn(restaurateurRepo, 'findByDocument').mockImplementation(() => Promise.resolve(right(null)));

    const testable = await sut.execute(makeFixture());

    expect(testable.isRight()).toBeTruthy();
  });

  it('should validate restaurateur at factory', async () => {
    const { sut, restaurateurFactory } = makeSut();

    jest.spyOn(restaurateurFactory, 'make').mockImplementation(() => left(new PropsAreRequired()));

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should check if restaurateur is already in use', async () => {
    const { sut, restaurateurFactory } = makeSut();

    jest.spyOn(restaurateurFactory, 'make').mockImplementation(() => right({} as Restaurateur));

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(DocumentAlreadyInUse);
  });

  it('should check restaurateur repo error', async () => {
    const { sut, restaurateurFactory, restaurateurRepo } = makeSut();

    jest.spyOn(restaurateurFactory, 'make').mockImplementation(() => right({} as Restaurateur));
    jest
      .spyOn(restaurateurRepo, 'findByDocument')
      .mockImplementation(() => Promise.resolve(left(new InfraError('any'))));

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(InfraError);
  });
});
