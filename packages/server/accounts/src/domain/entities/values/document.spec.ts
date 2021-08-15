import { Document } from '@/domain/entities/values';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';

import { nullAsType } from '@/utils';

describe('Document Unitary Tests', () => {
  it('should create a valid sanitized document', () => {
    const testable = Document.create({
      value: 'document',
      isSanitized: true
    });

    expect(testable.isRight()).toBeTruthy();

    const password = testable.value as Document;

    expect(password.value).toEqual('document');
    expect(password.isSanitized).toBeTruthy();
  });

  it('should create a valid unsanitized document', () => {
    const testable = Document.create({
      value: 'document'
    });

    expect(testable.isRight()).toBeTruthy();

    const password = testable.value as Document;

    expect(password.value).toEqual('document');
    expect(password.isSanitized).toBeFalsy();
  });

  it('should validate props itself', () => {
    const testable = Document.create(nullAsType());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate if value is falsy', () => {
    const testable = Document.create({ value: nullAsType() });

    expect(testable.isLeft()).toBeTruthy();
    expect((testable.value as FieldIsRequired).field).toEqual('document');
  });
});
