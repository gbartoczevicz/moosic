import { left, right } from '@shared/utils';
import { CreateUserController } from '@/domain/controllers';
import { CreateUserUseCase } from '@/domain/use-cases';
import { FakeUsersRepo } from '@/ports/database/fakes';
import { IdFactory, PasswordFactory, PhoneFactory, UserFactory } from '@/domain/factories';
import { FakeIdProvider, FakePasswordProvider, FakePhoneProvider } from '@/ports/providers/fakes';
import { HttpRequest } from '@/ports/http';
import { User } from '@/domain/entities';
import { InfraError, ServerError } from '@/ports/errors';
import { PropsAreRequired } from '@/domain/entities/errors';

const makeSut = () => {
  const userFactory = new UserFactory(
    new IdFactory(new FakeIdProvider()),
    new PasswordFactory(new FakePasswordProvider(), 8),
    new PhoneFactory(new FakePhoneProvider())
  );

  const createUserUseCase = new CreateUserUseCase(userFactory, new FakeUsersRepo());

  return {
    sut: new CreateUserController(createUserUseCase),
    createUserUseCase
  };
};

const makeFixture = (): HttpRequest => ({
  body: {
    name: 'user',
    email: 'email',
    password: 'password',
    phone: 'phone'
  }
});

describe('Create User Controller Unitary Tests', () => {
  it('should create an user', async () => {
    const { sut, createUserUseCase } = makeSut();

    jest
      .spyOn(createUserUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(right({ name: "user's name" } as User)));

    const testable = await sut.handle(makeFixture());

    expect(testable.body).toEqual({ name: "user's name" });
    expect(testable.statusCode).toEqual(200);
  });

  it('should validate business exception', async () => {
    const { sut, createUserUseCase } = makeSut();

    jest.spyOn(createUserUseCase, 'execute').mockImplementation(() => Promise.resolve(left(new PropsAreRequired())));

    const testable = await sut.handle(makeFixture());

    expect(testable.statusCode).toEqual(400);
    expect(testable.body).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate an infra error', async () => {
    const { sut, createUserUseCase } = makeSut();

    jest
      .spyOn(createUserUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(left(new InfraError('unexpected'))));

    const testable = await sut.handle(makeFixture());

    expect(testable.body).toBeInstanceOf(ServerError);
  });
});
