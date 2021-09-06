import { Establishment } from '@/domain/entities/establishment';
import { Id, Phone } from '@/domain/entities/values';
import { makeId, makePhone } from '@/domain/entities/values/fakes';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';
import { nullAsType } from '@/utils';

describe('Establishment Unitary Tests', () => {
  it('should create a valid establishment', () => {
    const testable = Establishment.create({
      id: makeId({}).value as Id,
      name: 'establishment',
      phone: makePhone({}).value as Phone,
      restaurateurId: makeId({}).value as Id
    });

    expect(testable.isRight()).toBeTruthy();

    const establishment = testable.value as Establishment;

    expect(establishment.name).toEqual('establishment');
    expect(establishment.phone.value).toEqual('0000-0000');
    expect(establishment.id.value).toEqual('id');
    expect(establishment.restaurateurId.value).toEqual('id');
  });

  it('should validate props itself', () => {
    const testable = Establishment.create(nullAsType());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  describe('value objects validation', () => {
    it('should validate establishment id', () => {
      const testable = Establishment.create({
        id: nullAsType(),
        name: 'name',
        phone: makePhone({}).value as Phone,
        restaurateurId: makeId({}).value as Id
      });

      expect(testable.isLeft()).toBeTruthy();
      expect((testable.value as FieldIsRequired).field).toEqual('id');
    });

    it('should validate establishment name', () => {
      const testable = Establishment.create({
        id: makeId({}).value as Id,
        name: nullAsType(),
        phone: makePhone({}).value as Phone,
        restaurateurId: makeId({}).value as Id
      });

      expect(testable.isLeft()).toBeTruthy();
      expect((testable.value as FieldIsRequired).field).toEqual('name');
    });

    it('should validate establishment phone', () => {
      const testable = Establishment.create({
        id: makeId({}).value as Id,
        name: 'establishment',
        phone: nullAsType(),
        restaurateurId: makeId({}).value as Id
      });

      expect(testable.isLeft()).toBeTruthy();
      expect((testable.value as FieldIsRequired).field).toEqual('phone');
    });

    it('should validate establishment restaurateurId', () => {
      const testable = Establishment.create({
        id: makeId({}).value as Id,
        name: 'establishment',
        phone: makePhone({}).value as Phone,
        restaurateurId: nullAsType()
      });

      expect(testable.isLeft()).toBeTruthy();
      expect((testable.value as FieldIsRequired).field).toEqual('restaurateurId');
    });
  });
});
