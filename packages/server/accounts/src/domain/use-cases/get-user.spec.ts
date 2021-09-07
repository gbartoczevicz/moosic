import { left, right } from '@/utils';
import { GetUserUseCase } from '@/domain/use-cases';
import { FakeIdProvider } from '@/ports/providers/fakes';
import { IdFactory } from '@/domain/factories';
import { FakeUsersRepo } from '@/ports/database/fakes';
import { User } from '@/domain/entities';
import { PropsAreRequired } from '@/domain/entities/errors';
import { UserNotFound } from '@/domain/use-cases/errors';
import { InfraError } from '@/ports/errors';

const USER_ID = 'to_find_user';

const makeSut = () => {
  const idFactory = new IdFactory(new FakeIdProvider());
  const usersRepo = new FakeUsersRepo();

  return {
    sut: new GetUserUseCase(usersRepo, idFactory),
    usersRepo,
    idFactory
  };
};

describe('Get User use case unitary tests', () => {
  it('should find the user', async () => {
    const { sut } = makeSut();

    const testable = await sut.execute({ id: USER_ID });

    expect(testable.isRight()).toBeTruthy();

    const user = testable.value as User;

    expect(user.id.value).toEqual(USER_ID);
  });

  it('should return left when user is not found', async () => {
    const { sut, usersRepo } = makeSut();

    jest.spyOn(usersRepo, 'findById').mockImplementation(() => Promise.resolve(right(null)));

    const testable = await sut.execute({ id: USER_ID });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(UserNotFound);
  });

  it('should validate id factory', async () => {
    const { sut, idFactory } = makeSut();

    jest.spyOn(idFactory, 'make').mockImplementation(() => left(new PropsAreRequired()));

    const testable = await sut.execute({ id: USER_ID });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate infra error', async () => {
    const { sut, usersRepo } = makeSut();

    jest.spyOn(usersRepo, 'findById').mockImplementation(() => Promise.resolve(left(new InfraError('any'))));

    const testable = await sut.execute({ id: USER_ID });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(InfraError);
  });
});
