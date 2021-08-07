import { Password } from '@/domain/entities/values';
import { InvalidPassword } from '@/domain/entities/errors';

import { nullAsType } from '@/utils';

describe('Password Unitary Tests', () => {
  it('should create a valid hashed password', () => {
    const testable = Password.create({
      value: 'password',
      isHashed: true
    });

    expect(testable.isRight()).toBeTruthy();

    const password = testable.value as Password;

    expect(password.value).toEqual('password');
    expect(password.isHashed).toBeTruthy();
  });

  it('should create a valid unhashed password', () => {
    const testable = Password.create({
      value: 'password'
    });

    expect(testable.isRight()).toBeTruthy();

    const password = testable.value as Password;

    expect(password.value).toEqual('password');
    expect(password.isHashed).toBeFalsy();
  });

  it('should validate props itself', () => {
    const testable = Password.create(nullAsType());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(InvalidPassword);
    expect((testable.value as InvalidPassword).message).toEqual('Props is required');
  });

  describe('value validation', () => {
    it('should validate if value is falsy', () => {
      const testable = Password.create({ value: nullAsType() });

      expect(testable.isLeft()).toBeTruthy();
      expect(testable.value).toBeInstanceOf(InvalidPassword);
      expect((testable.value as InvalidPassword).message).toEqual('Password is required');
    });

    it('should validate value length', () => {
      const testable = Password.create({ value: '123' });

      expect(testable.isLeft()).toBeTruthy();
      expect(testable.value).toBeInstanceOf(InvalidPassword);
      expect((testable.value as InvalidPassword).message).toEqual(
        `The minimum length for password is ${Password.MINIMUM_LENGTH}`
      );
    });
  });
});
