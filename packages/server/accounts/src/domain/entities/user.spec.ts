import { User } from '@/domain/entities/user';
import { Email, Password, Phone } from '@/domain/entities/values';
import { makeEmail, makePassword, makePhone } from '@/domain/entities/values/fakes';
import { InvalidUser, PropsAreRequired } from '@/domain/entities/errors';

import { nullAsType } from '@/utils';

describe('User Unitary Tests', () => {
  it('should create a valid user', () => {
    const testable = User.create({
      name: 'user',
      email: makeEmail({}).value as Email,
      password: makePassword({}).value as Password,
      phone: makePhone({}).value as Phone
    });

    expect(testable.isRight()).toBeTruthy();

    const user = testable.value as User;

    expect(user.name).toEqual('user');
    expect(user.email.value).toEqual('user_email@email.com');
    expect(user.password.value).toEqual('secret_value');
    expect(user.phone.value).toEqual('0000-0000');
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
        email: makeEmail({}).value as Email,
        password: makePassword({}).value as Password,
        phone: makePhone({}).value as Phone
      });

      expect(testable.isLeft()).toBeTruthy();
      expect(testable.value).toBeInstanceOf(InvalidUser);
      expect((testable.value as InvalidUser).message).toEqual('Name is required');
    });

    it("should validate user's email", () => {
      const testable = User.create({
        name: 'user',
        email: nullAsType(),
        password: makePassword({}).value as Password,
        phone: makePhone({}).value as Phone
      });

      expect(testable.isLeft()).toBeTruthy();
      expect(testable.value).toBeInstanceOf(InvalidUser);
      expect((testable.value as InvalidUser).message).toEqual('Email is required');
    });

    it("should validate user's password", () => {
      const testable = User.create({
        name: 'user',
        email: makeEmail({}).value as Email,
        password: nullAsType(),
        phone: makePhone({}).value as Phone
      });

      expect(testable.isLeft()).toBeTruthy();
      expect(testable.value).toBeInstanceOf(InvalidUser);
      expect((testable.value as InvalidUser).message).toEqual('Password is required');
    });

    it("should validate user's phone", () => {
      const testable = User.create({
        name: 'user',
        email: makeEmail({}).value as Email,
        password: makePassword({}).value as Password,
        phone: nullAsType()
      });

      expect(testable.isLeft()).toBeTruthy();
      expect(testable.value).toBeInstanceOf(InvalidUser);
      expect((testable.value as InvalidUser).message).toEqual('Phone is required');
    });
  });
});
