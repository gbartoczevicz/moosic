import { Restaurateur } from '@/domain/entities/restaurateur';
import { Document, Id } from '@/domain/entities/values';
import { nullAsType } from '@/utils';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';
import { makeId } from '@/domain/entities/values/fakes';

describe('Restaurateur Unitary Tests', () => {
  it('should create a valid restaurateur', () => {
    const testable = Restaurateur.create({
      id: makeId({}).value as Id,
      userId: makeId({}).value as Id,
      document: Document.create({ value: 'document' }).value as Document
    });

    expect(testable.isRight()).toBeTruthy();

    const restaurateur = testable.value as Restaurateur;

    expect(restaurateur.id.value).toEqual('id');
    expect(restaurateur.userId.value).toEqual('id');
    expect(restaurateur.document).toEqual('document');

    expect(restaurateur.toPlain()).toEqual({
      id: 'id',
      userId: 'id',
      document: 'document'
    });
  });

  it('should validate props itself', () => {
    const testable = Restaurateur.create(nullAsType());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate if id is null', () => {
    const testable = Restaurateur.create({
      id: nullAsType(),
      userId: makeId({}).value as Id,
      document: Document.create({ value: 'document' }).value as Document
    });

    expect(testable.isLeft()).toBeTruthy();
    expect((testable.value as FieldIsRequired).field).toEqual('id');
  });

  it('should validate if userId is null', () => {
    const testable = Restaurateur.create({
      id: makeId({}).value as Id,
      userId: nullAsType(),
      document: Document.create({ value: 'document' }).value as Document
    });

    expect(testable.isLeft()).toBeTruthy();
    expect((testable.value as FieldIsRequired).field).toEqual('userId');
  });

  it('should validate if document is null', () => {
    const testable = Restaurateur.create({
      id: makeId({}).value as Id,
      userId: makeId({}).value as Id,
      document: nullAsType()
    });

    expect(testable.isLeft()).toBeTruthy();
    expect((testable.value as FieldIsRequired).field).toEqual('document');
  });
});
