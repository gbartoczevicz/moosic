import { nullAsType } from '@/utils';

import { Id } from '@/domain/entities/values';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';

describe('Id Unitary Tests', () => {
  it('should create a valid Id', () => {
    const testable = Id.create({ value: 'id' });

    expect(testable.isRight()).toBeTruthy();

    const id = testable.value as Id;

    expect(id.value).toEqual('id');
  });

  it('should validate props itself', () => {
    const testable = Id.create(nullAsType());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate if value is null', () => {
    const testable = Id.create({ value: nullAsType() });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(FieldIsRequired);
  });

  describe('equals method', () => {
    it('should validate if param is nullish', () => {
      const testable = Id.create({ value: 'any' });

      const id = testable.value as Id;

      expect(id.equals(nullAsType())).toEqual(false);
    });

    it('should compare string param', () => {
      const testable = Id.create({ value: 'any' });

      const id = testable.value as Id;

      expect(id.equals('not equal')).toEqual(false);
    });

    it('should compare object param', () => {
      const testable = Id.create({ value: 'any' });

      const id = testable.value as Id;

      const toCompare = Id.create({ value: 'any' });

      const idToCompare = toCompare.value as Id;

      expect(id.equals(idToCompare)).toEqual(true);
    });
  });
});
