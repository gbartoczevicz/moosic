import { User } from '@/domain/entities/user';
import { InvalidEmail, InvalidUser } from '@/domain/entities/errors';

import { nullAsType } from '@/utils';

describe('User Unitary Tests', () => {
  it('should create a valid user', () => {
    const testable = User.create({ email: 'user+01@email.com' });

    expect(testable.isRight()).toBeTruthy();

    expect(testable.value).toBeInstanceOf(User);
  });

  it('should validate props itself', () => {
    const testable = User.create(nullAsType());

    expect(testable.isLeft()).toBeTruthy();

    expect(testable.value).toBeInstanceOf(InvalidUser);
    expect((testable.value as InvalidUser).message).toEqual('Props is required');
  });

  it("should validate user's email", () => {
    const testable = User.create({ email: nullAsType() });

    expect(testable.isLeft()).toBeTruthy();

    expect(testable.value).toBeInstanceOf(InvalidEmail);
    expect((testable.value as InvalidEmail).message).toEqual('Address is required');
  });
});
