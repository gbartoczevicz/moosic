import { Phone } from '@/domain/entities/values';
import { InvalidPhone, PropsAreRequired } from '@/domain/entities/errors';

import { nullAsType } from '@/utils';

describe('Phone Unitary Tests', () => {
  it('should create a valid phone', () => {
    const testable = Phone.create({ value: '(00) 0000-0000' });

    expect(testable.isRight()).toBeTruthy();
    expect((testable.value as Phone).value).toEqual('(00) 0000-0000');
  });

  it('should validate props itself', () => {
    const testable = Phone.create(nullAsType());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate if value is null', () => {
    const testable = Phone.create({ value: nullAsType() });

    expect(testable.isLeft()).toBeTruthy();
    expect((testable.value as InvalidPhone).message).toEqual('Phone is required');
  });
});
