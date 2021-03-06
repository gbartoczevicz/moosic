import { User } from '@/domain/entities/user';
import { Email, Id, Password, Phone } from '@/domain/entities/values';
import { makeEmail, makeId, makePassword, makePhone } from '@/domain/entities/values/fakes';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';

import { nullAsType } from '@/utils';

describe('User Unitary Tests', () => {
  it('should create a valid user', () => {
    const testable = User.create({
      id: makeId({}).value as Id,
      name: 'user',
      email: makeEmail({}).value as Email,
      password: makePassword({}).value as Password,
      phone: makePhone({}).value as Phone
    });

    expect(testable.isRight()).toBeTruthy();

    const user = testable.value as User;

    expect(user.id.value).toEqual('id');
    expect(user.name).toEqual('user');
    expect(user.email.value).toEqual('user_email@email.com');
    expect(user.password.value).toEqual('secret_value');
    expect(user.phone.value).toEqual('0000-0000');

    expect(user.toPlain()).toEqual({
      id: 'id',
      name: 'user',
      email: 'user_email@email.com',
      phone: '0000-0000'
    });
  });

  it('should validate props itself', () => {
    const testable = User.create(nullAsType());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  describe('value objects validation', () => {
    it("should validate user's id", () => {
      const testable = User.create({
        id: nullAsType(),
        name: 'name',
        email: makeEmail({}).value as Email,
        password: makePassword({}).value as Password,
        phone: makePhone({}).value as Phone
      });

      expect(testable.isLeft()).toBeTruthy();
      expect(testable.value).toBeInstanceOf(FieldIsRequired);
      expect((testable.value as FieldIsRequired).field).toEqual('id');
    });

    it("should validate user's name", () => {
      const testable = User.create({
        id: makeId({}).value as Id,
        name: nullAsType(),
        email: makeEmail({}).value as Email,
        password: makePassword({}).value as Password,
        phone: makePhone({}).value as Phone
      });

      expect(testable.isLeft()).toBeTruthy();
      expect(testable.value).toBeInstanceOf(FieldIsRequired);
      expect((testable.value as FieldIsRequired).field).toEqual('name');
    });

    it("should validate user's email", () => {
      const testable = User.create({
        id: makeId({}).value as Id,
        name: 'user',
        email: nullAsType(),
        password: makePassword({}).value as Password,
        phone: makePhone({}).value as Phone
      });

      expect(testable.isLeft()).toBeTruthy();
      expect(testable.value).toBeInstanceOf(FieldIsRequired);
      expect((testable.value as FieldIsRequired).field).toEqual('email');
    });

    it("should validate user's password", () => {
      const testable = User.create({
        id: makeId({}).value as Id,
        name: 'user',
        email: makeEmail({}).value as Email,
        password: nullAsType(),
        phone: makePhone({}).value as Phone
      });

      expect(testable.isLeft()).toBeTruthy();
      expect(testable.value).toBeInstanceOf(FieldIsRequired);
      expect((testable.value as FieldIsRequired).field).toEqual('password');
    });

    it("should validate user's phone", () => {
      const testable = User.create({
        id: makeId({}).value as Id,
        name: 'user',
        email: makeEmail({}).value as Email,
        password: makePassword({}).value as Password,
        phone: nullAsType()
      });

      expect(testable.isLeft()).toBeTruthy();
      expect(testable.value).toBeInstanceOf(FieldIsRequired);
      expect((testable.value as FieldIsRequired).field).toEqual('phone');
    });
  });
});
