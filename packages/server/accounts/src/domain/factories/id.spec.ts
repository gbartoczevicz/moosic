import { IdFactory } from '@/domain/factories';
import { Id } from '@/domain/entities/values';
import { FakeIdProvider } from '@/ports/providers/fakes';
import { nullAsType } from '@/utils';
import { PropsAreRequired } from '@/domain/entities/errors';

const makeSut = () => ({
  sut: new IdFactory(new FakeIdProvider())
});

describe('Id Factory Unitary Test', () => {
  it('should create a valid id', () => {
    const { sut } = makeSut();

    const testable = sut.make({});

    expect(testable.isRight()).toBeTruthy();

    const id = testable.value as Id;

    expect(id.value).toEqual('generated');
  });

  it('should create props itself', () => {
    const { sut } = makeSut();

    const testable = sut.make(nullAsType());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });
});
