import { left, right } from '@shared/utils';
import { PasswordFactory, PhoneFactory, UserFactory } from '@/domain/factories';
import { FakeHashingProvider, FakePhoneNumber } from '@/domain/factories/ports/fakes';
import { CreateUserUseCase } from '@/domain/use-cases';
import { FakeUsersRepo } from '@/domain/use-cases/ports/fakes';
import { User } from '@/domain/entities';
import { CreateUserDTO } from '@/domain/use-cases/dtos';
import { PropsAreRequired } from '@/domain/entities/errors';
import { EmailAlreadyInUse, PhoneAlreadyInUse } from '@/domain/use-cases/errors';
import { InfraError } from '@/domain/use-cases/ports/errors';

const makeFixture = (): CreateUserDTO => ({
  name: 'User Name',
  email: 'user_email@email.com',
  password: 'secret',
  phone: '0000-0000'
});

const makeSut = () => {
  const passwordFactory = new PasswordFactory(new FakeHashingProvider(), 8);
  const phoneFactory = new PhoneFactory(new FakePhoneNumber());

  const userFactory = new UserFactory(passwordFactory, phoneFactory);
  const usersRepo = new FakeUsersRepo();

  return {
    sut: new CreateUserUseCase(userFactory, usersRepo),
    userFactory,
    usersRepo
  };
};

describe('Create User Unitary Test', () => {
  it('should create a user', async () => {
    const { sut, userFactory, usersRepo } = makeSut();

    jest.spyOn(userFactory, 'make').mockImplementation(() => Promise.resolve(right({} as User)));
    jest.spyOn(usersRepo, 'findByPhone').mockImplementation(() => Promise.resolve(right(null)));
    jest.spyOn(usersRepo, 'findByEmail').mockImplementation(() => Promise.resolve(right(null)));

    const testable = await sut.execute(makeFixture());

    expect(testable.isRight()).toBeTruthy();
    // expect(testable.value).toBeInstanceOf(User);
  });

  it('should validate user at factory', async () => {
    const { sut, userFactory } = makeSut();

    jest.spyOn(userFactory, 'make').mockImplementation(() => Promise.resolve(left(new PropsAreRequired())));

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it("should check if users's phone is already in use", async () => {
    const { sut, userFactory } = makeSut();

    jest.spyOn(userFactory, 'make').mockImplementation(() => Promise.resolve(right({} as User)));

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PhoneAlreadyInUse);
  });

  it("should check if users's e-mail is already in use", async () => {
    const { sut, userFactory, usersRepo } = makeSut();

    jest.spyOn(userFactory, 'make').mockImplementation(() => Promise.resolve(right({} as User)));
    jest.spyOn(usersRepo, 'findByPhone').mockImplementation(() => Promise.resolve(right(null)));

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(EmailAlreadyInUse);
  });

  describe('Repository Infra Error validation', () => {
    it('should validate users repo findByPhone', async () => {
      const { sut, userFactory, usersRepo } = makeSut();

      jest.spyOn(userFactory, 'make').mockImplementation(() => Promise.resolve(right({} as User)));
      jest.spyOn(usersRepo, 'findByPhone').mockImplementation(() => Promise.resolve(left(new InfraError('any'))));

      const testable = await sut.execute(makeFixture());

      expect(testable.isLeft()).toBeTruthy();
      expect(testable.value).toBeInstanceOf(InfraError);
    });
    it('should validate users repo findByEmail', async () => {
      const { sut, userFactory, usersRepo } = makeSut();

      jest.spyOn(userFactory, 'make').mockImplementation(() => Promise.resolve(right({} as User)));
      jest.spyOn(usersRepo, 'findByPhone').mockImplementation(() => Promise.resolve(right(null)));
      jest.spyOn(usersRepo, 'findByEmail').mockImplementation(() => Promise.resolve(left(new InfraError('any'))));

      const testable = await sut.execute(makeFixture());

      expect(testable.isLeft()).toBeTruthy();
      expect(testable.value).toBeInstanceOf(InfraError);
    });
  });
});
