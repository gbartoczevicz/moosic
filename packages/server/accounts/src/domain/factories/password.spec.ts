import { PasswordFactory } from '@/domain/factories';
import { FakePasswordProvider } from '@/ports/providers/fakes';
import { Password } from '@/domain/entities/values';

const makeSut = () => ({
  sut: new PasswordFactory(new FakePasswordProvider(), 8)
});

describe('Password Factory Unitary Tests', () => {
  it('should create a hashed password', async () => {
    const { sut } = makeSut();

    const testable = await sut.make({
      value: 'to_encode_password',
      toEncode: true
    });

    expect(testable.isRight()).toBeTruthy();

    const password = testable.value as Password;

    expect(password.value).toEqual('hashed_value');
    expect(password.isHashed).toEqual(true);
  });

  it('should create a plain password', async () => {
    const { sut } = makeSut();

    const testable = await sut.make({
      value: 'to_keep_value',
      toEncode: false
    });

    expect(testable.isRight()).toBeTruthy();

    const password = testable.value as Password;

    expect(password.value).toEqual('to_keep_value');
    expect(password.isHashed).toEqual(false);
  });
});
