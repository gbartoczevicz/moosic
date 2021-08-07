import { User } from '@/domain/entities/user';
import { nullAsType } from '@/utils';

describe('User Unitary Tests', () => {
  it('should create a valid user', () => {
    const testable = User.create({ email: 'user+01@email.com' });

    expect(testable).toBeInstanceOf(User);
  });

  it('should validate props itself', () => {
    const testable = User.create(nullAsType());

    expect(testable).toBeInstanceOf(Error);
    expect((testable as Error).message).toEqual('Props is required');
  });

  it("should validate user's email", () => {
    const testable = User.create({ email: nullAsType() });

    expect(testable).toBeInstanceOf(Error);
    expect((testable as Error).message).toEqual('Email is required');
  });
});
