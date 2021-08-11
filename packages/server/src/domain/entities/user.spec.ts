import { User } from '@/domain/entities/user';
import { InvalidEmail, InvalidPassword, InvalidPhone, InvalidUser, PropsAreRequired } from '@/domain/entities/errors';

import { nullAsType } from '@/utils';

describe('User Unitary Tests', () => {
  it('should create a valid user', () => {
    const testable = User.create({
      name: 'user',
      email: { value: 'user+01@email.com' },
      password: { value: 'password' },
      phone: { value: '00 0000 0000' }
    });

    expect(testable.isRight()).toBeTruthy();

    const user = testable.value as User;

    expect(user.email.value).toEqual('user+01@email.com');
    expect(user.password.value).toEqual('password');
  });

  it('should validate props itself', () => {
    const testable = User.create(nullAsType());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  describe('value objects validation', () => {
    it("should validate user's name", () => {
      const testable = User.create({
        name: nullAsType(),
        email: { value: 'user+01@email.com' },
        password: { value: 'password' },
        phone: { value: '00 0000 0000' }
      });

      expect(testable.isLeft()).toBeTruthy();
      expect(testable.value).toBeInstanceOf(InvalidUser);
      expect((testable.value as InvalidUser).message).toEqual('Name is required');
    });

    it("should validate user's email", () => {
      const testable = User.create({
        name: 'user',
        email: { value: nullAsType() },
        password: { value: 'password' },
        phone: { value: '00 0000 0000' }
      });

      expect(testable.isLeft()).toBeTruthy();
      expect(testable.value).toBeInstanceOf(InvalidEmail);
      expect((testable.value as InvalidEmail).message).toEqual('Address is required');
    });

    it("should validate user's password", () => {
      const testable = User.create({
        name: 'user',
        email: { value: 'user+01@email.com' },
        password: { value: nullAsType() },
        phone: { value: '00 0000 0000' }
      });

      expect(testable.isLeft()).toBeTruthy();
      expect(testable.value).toBeInstanceOf(InvalidPassword);
      expect((testable.value as InvalidPassword).message).toEqual('Password is required');
    });

    it("should validate user's password", () => {
      const testable = User.create({
        name: 'user',
        email: { value: 'user+01@email.com' },
        password: { value: 'password' },
        phone: { value: nullAsType() }
      });

      expect(testable.isLeft()).toBeTruthy();
      expect(testable.value).toBeInstanceOf(InvalidPhone);
      expect((testable.value as InvalidPhone).message).toEqual('Phone is required');
    });
  });
});
