import { SetSessionUseCase } from '@/domain/use-cases';
import { FakeIdProvider, FakeJwtProvider } from '@/ports/providers/fakes';
import { Id } from '@/domain/entities/values';
import { IdFactory } from '@/domain/factories';
import { InvalidCredentials } from '@/domain/use-cases/errors';
import { nullAsType } from '@/utils';

const makeSut = () => {
  const jwtProvider = new FakeJwtProvider();
  const idFactory = new IdFactory(new FakeIdProvider());

  return {
    sut: new SetSessionUseCase(jwtProvider, idFactory, 'secret'),
    jwtProvider
  };
};

const makeFixture = () => ({ bearer: 'Authorization: Bearer any' });

describe('SetSessionUseCase Unitary Test', () => {
  it('should create a valid Id', () => {
    const { sut } = makeSut();

    const testable = sut.execute(makeFixture());

    expect(testable.isRight()).toBeTruthy();

    const id = testable.value as Id;

    expect(id.value).toEqual('value');
  });

  it('should check if bearer is present', () => {
    const { sut } = makeSut();

    const testable = sut.execute({ bearer: nullAsType() });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(InvalidCredentials);
  });

  it('should check if bearer is valid', () => {
    const { sut } = makeSut();

    const testable = sut.execute({ bearer: 'any' });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(InvalidCredentials);
  });

  it('should handle JWT verify error', () => {
    const { sut, jwtProvider } = makeSut();

    jest.spyOn(jwtProvider, 'verify').mockImplementation(() => {
      throw new Error();
    });

    const testable = sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(InvalidCredentials);
  });
});
