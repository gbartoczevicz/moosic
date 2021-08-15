import { Establishment } from '@/domain/entities/establishment';
import { Phone } from '@/domain/entities/values';
import { makePhone } from '@/domain/entities/values/fakes';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';
import { nullAsType } from '@/utils';

describe('Establishment Unitary Tests', () => {
  it('should create a valid establishment', () => {
    const testable = Establishment.create({
      name: 'establishment',
      phone: makePhone({}).value as Phone
    });

    expect(testable.isRight()).toBeTruthy();

    const establishment = testable.value as Establishment;

    expect(establishment.name).toEqual('establishment');
    expect(establishment.phone.value).toEqual('0000-0000');
  });

  it('should validate props itself', () => {
    const testable = Establishment.create(nullAsType());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  describe('value objects validation', () => {
    it('should validate establishment name', () => {
      const testable = Establishment.create({
        name: nullAsType(),
        phone: makePhone({}).value as Phone
      });

      expect(testable.isLeft()).toBeTruthy();
      expect((testable.value as FieldIsRequired).field).toEqual('name');
    });

    it('should validate establishment phone', () => {
      const testable = Establishment.create({
        name: 'establishment',
        phone: nullAsType()
      });

      expect(testable.isLeft()).toBeTruthy();
      expect((testable.value as FieldIsRequired).field).toEqual('phone');
    });
  });
});
