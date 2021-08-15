import { Restaurateur } from '@/domain/entities/restaurateur';
import { Document } from '@/domain/entities/values';
import { nullAsType } from '@/utils';
import { InvalidDocument, PropsAreRequired } from './errors';

describe('Restaurateur Unitary Tests', () => {
  it('should create a valid restaurateur', () => {
    const testable = Restaurateur.create({
      document: Document.create({ value: 'document' }).value as Document
    });

    expect(testable.isRight()).toBeTruthy();

    const restaurateur = testable.value as Restaurateur;

    expect(restaurateur.document).toBeDefined();
  });

  it('should validate props itself', () => {
    const testable = Restaurateur.create(nullAsType());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate if document is null', () => {
    const testable = Restaurateur.create({ document: nullAsType() });

    expect(testable.isLeft()).toBeTruthy();
    expect((testable.value as InvalidDocument).message).toEqual('Document is required');
  });
});
