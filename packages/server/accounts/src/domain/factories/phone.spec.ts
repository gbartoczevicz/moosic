import { Phone } from '@/domain/entities/values';
import { PhoneFactory } from '@/domain/factories';
import { FakePhoneNumber } from '@/domain/factories/ports/fakes';
import { nullAsType } from '@/utils';
import { InvalidPhonePattern } from '@/domain/factories/errors';
import { PropsAreRequired } from '@/domain/entities/errors';

const makeSut = () => {
  const phoneNumber = new FakePhoneNumber();

  return {
    sut: new PhoneFactory(phoneNumber),
    phoneNumber
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
    const { sut, phoneNumber } = makeSut();

    jest.spyOn(phoneNumber, 'validate').mockImplementation(() => false);

    const testable = sut.make({
      value: 'number',
      toSanitize: false
    });

    expect(testable.isLeft()).toBeTruthy();

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(InvalidPhonePattern);
  });
});
