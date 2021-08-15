import { Phone } from '@/domain/entities/values';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';

import { nullAsType } from '@/utils';

describe('Phone Unitary Tests', () => {
  it('should create a valid sanitized phone', () => {
    const testable = Phone.create({
      value: '0000000000',
      isSanitized: true
    });

    expect(testable.isRight()).toBeTruthy();

    const phone = testable.value as Phone;

    expect(phone.value).toEqual('0000000000');
    expect(phone.isSanitized).toBeTruthy();
  });

  it('should create a valid unsanitized phone', () => {
    const testable = Phone.create({
      value: '(00) 0000-0000'
    });

    expect(testable.isRight()).toBeTruthy();

    const phone = testable.value as Phone;

    expect(phone.value).toEqual('(00) 0000-0000');
    expect(phone.isSanitized).toBeFalsy();
  });

  it('should validate props itself', () => {
    const testable = Phone.create(nullAsType());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate if value is null', () => {
    const testable = Phone.create({ value: nullAsType() });

    expect(testable.isLeft()).toBeTruthy();
    expect((testable.value as FieldIsRequired).field).toEqual('phone');
  });
});
