import { left, right } from '@shared/utils';
import { CreateRestaurateurUseCase, GetUserUseCase } from '@/domain/use-cases';
import { FakeDocumentProvider, FakeIdProvider } from '@/ports/providers/fakes';
import { Restaurateur, User } from '@/domain/entities';
import { DocumentFactory, IdFactory, RestaurateurFactory } from '@/domain/factories';
import { FakeRestaurateurRepo, FakeUsersRepo } from '@/ports/database/fakes';
import { CreateRestaurateurDTO } from '@/domain/use-cases/dtos';
import { PropsAreRequired } from '@/domain/entities/errors';
import { DocumentAlreadyInUse, UserNotFound } from '@/domain/use-cases/errors';
import { InfraError } from '@/ports/errors';
import { makeId } from '@/domain/entities/values/fakes';
import { Document, Id } from '@/domain/entities/values';

const makeSut = () => {
  const idFactory = new IdFactory(new FakeIdProvider());

  const restaurateurFactory = new RestaurateurFactory(
    new IdFactory(new FakeIdProvider()),
    new DocumentFactory(new FakeDocumentProvider())
  );

  const restaurateurRepo = new FakeRestaurateurRepo();

  const getUserUseCase = new GetUserUseCase(new FakeUsersRepo(), idFactory);

  return {
    sut: new CreateRestaurateurUseCase(restaurateurFactory, restaurateurRepo, getUserUseCase),
    restaurateurFactory,
    restaurateurRepo,
    getUserUseCase
  };
};

const makeFixture = (): CreateRestaurateurDTO => ({
  document: 'document',
  userId: 'user_id'
});

const restaurateurFixture = () => {
  return Restaurateur.create({
    id: makeId({}).value as Id,
    userId: makeId({}).value as Id,
    document: Document.create({ value: 'document' }).value as Document
  }).value as Restaurateur;
};

describe('Create Restaurateur Unitary Test', () => {
  it('should create a valid restaurateur', async () => {
    const { sut, restaurateurFactory, restaurateurRepo, getUserUseCase } = makeSut();

    jest.spyOn(restaurateurFactory, 'make').mockImplementation(() => right(restaurateurFixture()));
    jest.spyOn(restaurateurRepo, 'findByDocument').mockImplementation(() => Promise.resolve(right(null)));
    jest.spyOn(getUserUseCase, 'execute').mockImplementation(() => Promise.resolve(right({} as User)));

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

  it('should check if document is already in use', async () => {
    const { sut, restaurateurFactory } = makeSut();

    jest.spyOn(restaurateurFactory, 'make').mockImplementation(() => right({} as Restaurateur));

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(DocumentAlreadyInUse);
  });

  it('should validate if user id does not exists', async () => {
    const { sut, restaurateurFactory, restaurateurRepo, getUserUseCase } = makeSut();

    jest.spyOn(restaurateurFactory, 'make').mockImplementation(() => right(restaurateurFixture()));
    jest.spyOn(restaurateurRepo, 'findByDocument').mockImplementation(() => Promise.resolve(right(null)));
    jest.spyOn(getUserUseCase, 'execute').mockImplementation(() => Promise.resolve(left(new UserNotFound())));

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(UserNotFound);
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
