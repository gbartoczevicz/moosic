import { User } from '@/domain/entities/user';
import { InvalidEmail, InvalidPassword, InvalidUser } from '@/domain/entities/errors';

import { nullAsType } from '@/utils';

describe('User Unitary Tests', () => {
  it('should create a valid user', () => {
    const testable = User.create({ email: { value: 'user+01@email.com' }, password: { value: 'password' } });

    expect(testable.isRight()).toBeTruthy();

    expect(testable.value).toBeInstanceOf(User);

    const user = testable.value as User;

    expect(user.email.value).toEqual('user+01@email.com');
    expect(user.password.value).toEqual('password');
  });

  it('should validate props itself', () => {
    const testable = User.create(nullAsType());

    expect(testable.isLeft()).toBeTruthy();

    expect(testable.value).toBeInstanceOf(InvalidUser);
    expect((testable.value as InvalidUser).message).toEqual('Props is required');
  });

  describe('value objects validation', () => {
    it("should validate user's email", () => {
      const testable = User.create({ email: { value: nullAsType() }, password: { value: 'password' } });

      expect(testable.isLeft()).toBeTruthy();

      expect(testable.value).toBeInstanceOf(InvalidEmail);
      expect((testable.value as InvalidEmail).message).toEqual('Address is required');
    });

    it("should validate user's password", () => {
      const testable = User.create({ email: { value: 'user+01@email.com' }, password: { value: nullAsType() } });

      expect(testable.isLeft()).toBeTruthy();

      expect(testable.value).toBeInstanceOf(InvalidPassword);
      expect((testable.value as InvalidPassword).message).toEqual('Password is required');
    });
  });
});
