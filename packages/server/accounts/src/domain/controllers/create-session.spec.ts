import { CreateSessionUseCase } from '@/domain/use-cases';
import { CreateSessionController } from '@/domain/controllers';
import { User } from '@/domain/entities';
import { makeEmail, makeId, makePassword, makePhone } from '@/domain/entities/values/fakes';
import { Email, Id, Password, Phone } from '@/domain/entities/values';
import { left, right } from '@/utils';
import { badRequest, forbidden, ok, serverError } from '@/ports/http/helpers';
import { InfraError } from '@/ports/errors';
import { InvalidCredentials, UserNotFound } from '@/domain/use-cases/errors';
import { FakeUsersRepo } from '@/ports/database/fakes';
import { FakeJwtProvider, FakePasswordProvider } from '@/ports/providers/fakes';
import { HttpRequest } from '@/ports/http';
import { CreateSessionDTO } from '@/domain/use-cases/dtos';
import { PropsAreRequired } from '../entities/errors';

const makeSut = () => {
  const createSessionUseCase = new CreateSessionUseCase(
    new FakeUsersRepo(),
    {} as FakePasswordProvider,
    {} as FakeJwtProvider,
    { secret: 'secret', expiresAt: 3 }
  );

  return {
    sut: new CreateSessionController(createSessionUseCase),
    createSessionUseCase
  };
};

const makeFixture = () => {
  const dto: CreateSessionDTO = {
    email: 'email@email.com',
    password: 'secret_password'
  };

  const user = User.create({
    id: makeId({}).value as Id,
    name: 'User Name',
    email: makeEmail({ value: dto.email }).value as Email,
    password: makePassword({ value: dto.password }).value as Password,
    phone: makePhone({}).value as Phone
  }).value as User;

  return {
    dto: { body: dto } as HttpRequest,
    token: Date.now().toString(),
    user
  };
};

describe('CreateArtistController Unitary Tests', () => {
  it('should create an artist', async () => {
    const { sut, createSessionUseCase } = makeSut();

    const fixture = makeFixture();

    jest
      .spyOn(createSessionUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(right({ user: fixture.user, token: fixture.token })));

    const testable = await sut.handle(fixture.dto);

    expect(testable.statusCode).toEqual(ok({}).statusCode);
    expect(testable.body).toEqual({
      ...fixture.user.toPlain(),
      token: fixture.token
    });
  });

  it('should validate UserNotFound business exception', async () => {
    const { sut, createSessionUseCase } = makeSut();

    jest.spyOn(createSessionUseCase, 'execute').mockImplementation(() => Promise.resolve(left(new UserNotFound())));

    const testable = await sut.handle(makeFixture().dto);

    const response = forbidden();

    expect(testable.statusCode).toEqual(response.statusCode);
  });

  it('should validate InvalidCredentials business exception', async () => {
    const { sut, createSessionUseCase } = makeSut();

    jest
      .spyOn(createSessionUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(left(new InvalidCredentials())));

    const testable = await sut.handle(makeFixture().dto);

    const response = forbidden();

    expect(testable.statusCode).toEqual(response.statusCode);
  });

  it('should validate business exception', async () => {
    const { sut, createSessionUseCase } = makeSut();

    jest.spyOn(createSessionUseCase, 'execute').mockImplementation(() => Promise.resolve(left(new PropsAreRequired())));

    const testable = await sut.handle(makeFixture().dto);

    const response = badRequest(new PropsAreRequired());

    expect(testable.statusCode).toEqual(response.statusCode);
    expect(testable.body).toEqual(response.body);
  });

  it('should validate an infra error', async () => {
    const { sut, createSessionUseCase } = makeSut();

    jest.spyOn(createSessionUseCase, 'execute').mockImplementation(() => Promise.resolve(left(new InfraError('any'))));

    const testable = await sut.handle(makeFixture().dto);

    expect(testable.statusCode).toEqual(serverError().statusCode);
  });
});
