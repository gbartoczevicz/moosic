import { Email } from '@/domain/entities/values/email';
import { nullAsType } from '@/utils';

describe('Email Unitary Tests', () => {
  it('should create a valid email', () => {
    const testable = Email.create({ value: 'my_contact+01@email.com.br' });

    expect(testable).toBeInstanceOf(Email);
    expect((testable as Email).value).toEqual('my_contact+01@email.com.br');
  });

  it('should validate props itself', () => {
    const testable = Email.create(nullAsType());

    expect(testable).toBeInstanceOf(Error);
    expect((testable as Error).message).toEqual('Props is required');
  });

  it("should validate user's email", () => {
    const testable = Email.create({ value: nullAsType() });

    expect(testable).toBeInstanceOf(Error);
    expect((testable as Error).message).toEqual('Address is required');
  });
});
