import { left, right } from '@shared/utils';
import { CreateUserController } from '@/domain/controllers';
import { CreateUserUseCase } from '@/domain/use-cases';
import { FakeUsersRepo } from '@/ports/database/fakes';
import { IdFactory, PasswordFactory, PhoneFactory, UserFactory } from '@/domain/factories';
import { FakeIdProvider, FakePasswordProvider, FakePhoneProvider } from '@/ports/providers/fakes';
import { HttpRequest } from '@/ports/http';
import { User } from '@/domain/entities';
import { InfraError } from '@/ports/errors';
import { PropsAreRequired } from '@/domain/entities/errors';
import { serverError, badRequest } from '@/ports/http/helpers';
import { makeUser } from '@/domain/entities/fakes';
import { makeId, makePassword, makePhone } from '@/domain/entities/values/fakes';
import { Id, Email, Password, Phone } from '@/domain/entities/values';

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

const userFixture = () => {
  return makeUser({
    id: makeId({}).value as Id,
    name: "user's name",
    email: Email.create({ value: 'user_email@email.com' }).value as Email,
    password: makePassword({}).value as Password,
    phone: makePhone({}).value as Phone
  }).value as User;
};

describe('Create User Controller Unitary Tests', () => {
  it('should create an user', async () => {
    const { sut, createUserUseCase } = makeSut();

    jest.spyOn(createUserUseCase, 'execute').mockImplementation(() => Promise.resolve(right(userFixture())));

    const testable = await sut.handle(makeFixture());

    expect(testable.statusCode).toEqual(200);
    expect(testable.body).toEqual({
      id: 'id',
      name: "user's name",
      email: 'user_email@email.com',
      phone: '0000-0000'
    });
  });

  it('should validate business exception', async () => {
    const { sut, createUserUseCase } = makeSut();

    jest.spyOn(createUserUseCase, 'execute').mockImplementation(() => Promise.resolve(left(new PropsAreRequired())));

    const testable = await sut.handle(makeFixture());

    const response = badRequest(new PropsAreRequired());

    expect(testable.statusCode).toEqual(response.statusCode);
    expect(testable.body).toEqual(response.body);
  });

  it('should validate an infra error', async () => {
    const { sut, createUserUseCase } = makeSut();

    jest
      .spyOn(createUserUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(left(new InfraError('unexpected'))));

    const testable = await sut.handle(makeFixture());

    expect(testable.statusCode).toEqual(serverError().statusCode);
  });
});
