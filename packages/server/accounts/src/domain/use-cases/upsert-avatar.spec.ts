import { UpsertAvatarUseCase } from '@/domain/use-cases';
import { FakeUsersRepo } from '@/ports/database/fakes';
import { FakeIdProvider, FakeStorageProvider } from '@/ports/providers/fakes';
import { IdFactory, UserFactory } from '@/domain/factories';
import { UpsertAvatarDTO } from '@/domain/use-cases/dtos';
import { User } from '@/domain/entities';
import { left, right } from '@/utils';
import { InfraError } from '@/ports/errors';
import { PropsAreRequired } from '../entities/errors';
import { UserNotFound } from './errors';

function makeSut() {
  const storageProvider = new FakeStorageProvider();
  const usersRepo = new FakeUsersRepo();
  const userFactory = new UserFactory({} as any, {} as any, {} as any);
  const idFactory = new IdFactory(new FakeIdProvider());

  return {
    sut: new UpsertAvatarUseCase(storageProvider, usersRepo, userFactory, idFactory),
    storageProvider,
    userFactory,
    usersRepo,
    idFactory
  };
}

function makeFixture(): UpsertAvatarDTO {
  return {
    userId: 'any_id',
    filename: 'file.png'
  };
}

function makeUser(id: string, avatar: string) {
  return {
    id: { value: id },
    email: { value: 'any' },
    phone: { value: 'any' },
    password: { value: 'any' },
    avatar
  } as unknown as User;
}

describe('UpsertAvatarUseCase', () => {
  it('should save user with avatar', async () => {
    const { sut, ...composition } = makeSut();

    const fixture = makeFixture();

    jest
      .spyOn(composition.userFactory, 'make')
      .mockImplementationOnce(() => Promise.resolve(right(makeUser(fixture.userId, fixture.filename))));

    const testable = await sut.execute(fixture);

    expect(testable.isRight()).toBeTruthy();

    const user = testable.value as User;

    expect(user.id.value).toStrictEqual(fixture.userId);
    expect(user.avatar).toStrictEqual(fixture.filename);
  });

  it('should override existing avatar', async () => {
    const { sut, ...composition } = makeSut();

    const fixture = makeFixture();

    jest
      .spyOn(composition.usersRepo, 'findById')
      .mockImplementationOnce(() => Promise.resolve(right(makeUser(fixture.userId, 'any'))));

    jest
      .spyOn(composition.userFactory, 'make')
      .mockImplementationOnce(() => Promise.resolve(right(makeUser(fixture.userId, fixture.filename))));

    const testable = await sut.execute(fixture);

    expect(testable.isRight()).toBeTruthy();

    const user = testable.value as User;

    expect(user.id.value).toStrictEqual(fixture.userId);
    expect(user.avatar).toStrictEqual(fixture.filename);
  });

  it('should validate id', async () => {
    const { sut, ...composition } = makeSut();

    jest.spyOn(composition.idFactory, 'make').mockImplementationOnce(() => left(new PropsAreRequired()));

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate if user exists', async () => {
    const { sut, ...composition } = makeSut();

    const fixture = makeFixture();

    jest.spyOn(composition.usersRepo, 'findById').mockImplementationOnce(() => Promise.resolve(right(null)));

    const testable = await sut.execute(fixture);

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(UserNotFound);
  });

  it('should validate find by id error', async () => {
    const { sut, ...composition } = makeSut();

    const fixture = makeFixture();

    jest
      .spyOn(composition.usersRepo, 'findById')
      .mockImplementationOnce(() => Promise.resolve(left(new InfraError('a'))));

    const testable = await sut.execute(fixture);

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(InfraError);
  });

  it('should validate user before save', async () => {
    const { sut, ...composition } = makeSut();

    const fixture = makeFixture();

    jest
      .spyOn(composition.userFactory, 'make')
      .mockImplementationOnce(() => Promise.resolve(left(new PropsAreRequired())));

    const testable = await sut.execute(fixture);

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });
});
