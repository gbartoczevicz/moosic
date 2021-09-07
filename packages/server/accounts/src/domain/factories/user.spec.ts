import { left, nullAsType } from '@/utils';

import { User } from '@/domain/entities';
import { Email } from '@/domain/entities/values';
import { MinimumLength, PropsAreRequired } from '@/domain/entities/errors';
import { IdFactory, UserFactory, PasswordFactory, PhoneFactory, MakeUserProps } from '@/domain/factories';
import { FakePasswordProvider, FakeIdProvider, FakePhoneProvider } from '@/ports/providers/fakes';
import { InvalidPhonePattern } from '@/domain/factories/errors';

const makeSut = () => {
  const idFactory = new IdFactory(new FakeIdProvider());
  const passwordFactory = new PasswordFactory(new FakePasswordProvider(), 8);
  const phoneService = new PhoneFactory(new FakePhoneProvider());

  return {
    sut: new UserFactory(idFactory, passwordFactory, phoneService),
    idFactory,
    passwordFactory,
    phoneService
  };
};

const makeFixture = (toEncode = true): MakeUserProps => ({
  id: {},
  name: 'User Name',
  email: 'my_contact@email.com',
  password: { value: 'my_secret_password', toEncode },
  phone: { value: '0000-0000' }
});

describe('User Factory Unitary Tests', () => {
  it('should create a valid user', async () => {
    const { sut } = makeSut();

    const fixture = makeFixture();

    const testable = await sut.make(fixture);

    expect(testable.isRight()).toBeTruthy();

    const user = testable.value as User;

    expect(user.id.value).toEqual('generated');
    expect(user.name).toEqual(fixture.name);
    expect(user.email.value).toEqual(fixture.email);
    expect(user.password.value).toEqual('hashed_value');
    expect(user.password.isHashed).toEqual(fixture.password.toEncode);
    expect(user.phone.value).toEqual('sanitized');
  });

  it('should validate props itself', async () => {
    const { sut } = makeSut();

    const testable = await sut.make(nullAsType());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate id', async () => {
    const { sut, idFactory } = makeSut();

    jest.spyOn(idFactory, 'make').mockImplementation(() => left(new PropsAreRequired()));

    const testable = await sut.make(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate email', async () => {
    const { sut } = makeSut();

    jest.spyOn(Email, 'create').mockImplementation(() => left(new PropsAreRequired()));

    const testable = await sut.make(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate password', async () => {
    const { sut, passwordFactory } = makeSut();

    jest.spyOn(passwordFactory, 'make').mockImplementation(() => Promise.resolve(left(new MinimumLength(8))));

    const testable = await sut.make(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(MinimumLength);
  });

  it('should validate phone', async () => {
    const { sut, phoneService } = makeSut();

    jest.spyOn(phoneService, 'make').mockImplementation(() => left(new InvalidPhonePattern()));

    const testable = await sut.make(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(InvalidPhonePattern);
  });
});
