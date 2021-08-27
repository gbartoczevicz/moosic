import { Phone } from '@/domain/entities/values';
import { PhoneFactory } from '@/domain/factories';
import { FakePhoneProvider } from '@/ports/providers/fakes';
import { nullAsType } from '@/utils';
import { InvalidPhonePattern } from '@/domain/factories/errors';
import { PropsAreRequired } from '@/domain/entities/errors';

const makeSut = () => {
  const phoneProvider = new FakePhoneProvider();

  return {
    sut: new PhoneFactory(phoneProvider),
    phoneProvider
  };
};

describe('Phone Factory Unitary Tests', () => {
  it('should create a sanitized phone', () => {
    const { sut } = makeSut();

    const testable = sut.make({
      value: 'number',
      toSanitize: true
    });

    expect(testable.isRight()).toBeTruthy();

    const phone = testable.value as Phone;

    expect(phone.value).toEqual('sanitized');
    expect(phone.isSanitized).toEqual(true);
  });

  it('should create a formatted phone', () => {
    const { sut } = makeSut();

    const testable = sut.make({
      value: 'number',
      toSanitize: false
    });

    expect(testable.isRight()).toBeTruthy();

    const phone = testable.value as Phone;

    expect(phone.value).toEqual('formatted');
    expect(phone.isSanitized).toEqual(false);
  });

  it('should validate props itself', () => {
    const { sut } = makeSut();

    const testable = sut.make(nullAsType());

    expect(testable.isLeft()).toBeTruthy();

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate phone number', () => {
    const { sut, phoneProvider } = makeSut();

    jest.spyOn(phoneProvider, 'validate').mockImplementation(() => false);

    const testable = sut.make({
      value: 'number',
      toSanitize: false
    });

    expect(testable.isLeft()).toBeTruthy();

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(InvalidPhonePattern);
  });
});
