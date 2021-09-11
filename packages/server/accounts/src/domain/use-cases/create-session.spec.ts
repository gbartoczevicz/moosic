import { CreateSessionUseCase } from '@/domain/use-cases';
import { FakeUsersRepo } from '@/ports/database/fakes';
import { FakeJwtProvider, FakePasswordProvider } from '@/ports/providers/fakes';
import { User } from '@/domain/entities';
import { makeId, makePassword, makePhone } from '@/domain/entities/values/fakes';
import { Email, Id, Password, Phone } from '@/domain/entities/values';
import { CreateSessionDTO } from '@/domain/use-cases/dtos';
import { left, right } from '@/utils';
import { InfraError } from '@/ports/errors';
import { PropsAreRequired } from '../entities/errors';
import { InvalidCredentials, UserNotFound } from './errors';

const makeSut = () => {
  const usersRepo = new FakeUsersRepo();
  const passwordProvider = new FakePasswordProvider();
  const jwtProvider = new FakeJwtProvider();

  return {
    sut: new CreateSessionUseCase(usersRepo, passwordProvider, jwtProvider, { secret: 'secret', expiresAt: 5 }),
    usersRepo,
    passwordProvider,
    jwtProvider
  };
};

const makeFixture = () => {
  const user = User.create({
    id: makeId({}).value as Id,
    name: 'name',
    email: Email.create({ value: 'email@email.com' }).value as Email,
    password: makePassword({}).value as Password,
    phone: makePhone({}).value as Phone
  }).value as User;

  const dto: CreateSessionDTO = { email: 'email@email.com', password: 'very secret' };

  return {
    dto,
    user
  };
};

describe('CreateSessionUseCase Unitary Tests', () => {
  it('should create a valid session', async () => {
    const { sut, usersRepo } = makeSut();

    const fixture = makeFixture();

    jest.spyOn(usersRepo, 'findByEmail').mockImplementation(() => Promise.resolve(right(fixture.user)));

    const testable = await sut.execute(fixture.dto);

    expect(testable.isRight()).toBeTruthy();

    const response = <{ token: string; user: User }>testable.value;

    expect(response.user.id.value).toEqual(fixture.user.id.value);
    expect(response.token).toEqual('generated_jwt');
  });

  it('should validate email', async () => {
    const { sut } = makeSut();

    jest.spyOn(Email, 'create').mockImplementation(() => left(new PropsAreRequired()));

    const testable = await sut.execute(makeFixture().dto);

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate if user exists', async () => {
    const { sut, usersRepo } = makeSut();

    jest.spyOn(usersRepo, 'findByEmail').mockImplementation(() => Promise.resolve(right(null)));

    const testable = await sut.execute(makeFixture().dto);

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(UserNotFound);
  });

  it('should validate if password provided match', async () => {
    const { sut, passwordProvider } = makeSut();

    jest.spyOn(passwordProvider, 'compare').mockImplementation(() => Promise.resolve(false));

    const testable = await sut.execute(makeFixture().dto);

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(InvalidCredentials);
  });

  it('should validate infra error', async () => {
    const { sut, usersRepo } = makeSut();

    jest.spyOn(usersRepo, 'findByEmail').mockImplementation(() => Promise.resolve(left(new InfraError('any'))));

    const testable = await sut.execute(makeFixture().dto);

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(InfraError);
  });
});
