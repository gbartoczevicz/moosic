import { PhoneService } from '@/domain/services/phone';
import { FakePhoneNumber } from '@/domain/services/ports/fakes';
import { Phone } from '@/domain/entities/values';
import { InvalidPhonePattern } from '@/domain/services/errors';

const makeSut = () => {
  const fakePhoneNumber = new FakePhoneNumber();

  return {
    sut: new PhoneService(fakePhoneNumber),
    fakePhoneNumber
  };
};

describe('Phone Service Unitary Tests', () => {
  it('should create a sanitized phone', () => {
    const { sut } = makeSut();

    const testable = sut.createFromPlainValue('phone_number', true);

    expect(testable.isRight()).toBeTruthy();

    const phone = testable.value as Phone;

    expect(phone.value).toEqual('sanitized phone number');
    expect(phone.isSanitized).toBeTruthy();
  });

  it('should create a formatted phone', () => {
    const { sut } = makeSut();

    const testable = sut.createFromPlainValue('phone_number', false);

    expect(testable.isRight()).toBeTruthy();

    const phone = testable.value as Phone;

    expect(phone.value).toEqual('formatted phone number');
    expect(phone.isSanitized).toBeFalsy();
  });

  it('should validate plain value', () => {
    const { sut, fakePhoneNumber } = makeSut();

    jest.spyOn(fakePhoneNumber, 'validate').mockImplementation(() => false);

    const testable = sut.createFromPlainValue('phone_number', false);

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(InvalidPhonePattern);
  });
});
