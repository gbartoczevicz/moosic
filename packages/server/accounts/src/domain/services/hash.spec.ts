import { HashService } from '@/domain/services/hash';
import { FakeHashingProvider } from '@/domain/services/ports/fakes';
import { Password } from '@/domain/entities/values';

const makeSut = () => {
  return {
    sut: new HashService(new FakeHashingProvider(), 8)
  };
};

describe('Hash Service Unitary Tests', () => {
  it('should encode value', async () => {
    const { sut } = makeSut();

    const testable = await sut.encodePlain('plain password value');

    expect(testable).toEqual('hashed_value');
  });

  it('should compare unhashed password with plain value', async () => {
    const { sut } = makeSut();

    const fixture = Password.create({
      value: 'unhashed'
    }).value as Password;

    const testable = await sut.comparePlainWithHashed('plain_value', fixture);

    expect(testable).toBeFalsy();
  });

  it('should compare hashed password with plain value', async () => {
    const { sut } = makeSut();

    const fixture = Password.create({
      value: 'hashed_password',
      isHashed: true
    }).value as Password;

    const testable = await sut.comparePlainWithHashed('plain_value', fixture);

    expect(testable).toBeTruthy();
  });
});
