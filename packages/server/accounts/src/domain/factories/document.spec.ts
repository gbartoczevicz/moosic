import { Document, DocumentType } from '@/domain/entities/values';
import { FakeDocumentProvider } from '@/ports/providers/fakes';
import { DocumentFactory } from '@/domain/factories';
import { InvalidDocumentPattern, InvalidDocumentType } from '@/domain/factories/errors';
import { nullAsType } from '@/utils';
import { PropsAreRequired } from '@/domain/entities/errors';

const makeSut = () => {
  const fakeDocumentProvider = new FakeDocumentProvider();

  return {
    sut: new DocumentFactory(fakeDocumentProvider),
    fakeDocumentProvider
  };
};

describe('Document Factory Unitary Tests', () => {
  it('should create a sanitized cnpj', () => {
    const { sut } = makeSut();

    const testable = sut.make({
      value: 'cnpj',
      toSanitize: true,
      type: 'CNPJ'
    });

    expect(testable.isRight()).toBeTruthy();

    const document = testable.value as Document;

    expect(document.value).toEqual('sanitized');
    expect(document.isSanitized).toBeTruthy();
  });

  it('should create a unsanitized cnpj', () => {
    const { sut } = makeSut();

    const testable = sut.make({
      value: 'cnpj',
      toSanitize: false,
      type: 'CNPJ'
    });

    expect(testable.isRight()).toBeTruthy();

    const document = testable.value as Document;

    expect(document.value).toEqual('formatted');
    expect(document.isSanitized).toBeFalsy();
  });

  it('should create a sanitized cpf', () => {
    const { sut } = makeSut();

    const testable = sut.make({
      value: 'cpf',
      toSanitize: true,
      type: 'CPF'
    });

    expect(testable.isRight()).toBeTruthy();

    const document = testable.value as Document;

    expect(document.value).toEqual('sanitized');
    expect(document.isSanitized).toBeTruthy();
  });

  it('should create a unsanitized cpf', () => {
    const { sut } = makeSut();

    const testable = sut.make({
      value: 'cpf',
      toSanitize: false,
      type: 'CPF'
    });

    expect(testable.isRight()).toBeTruthy();

    const document = testable.value as Document;

    expect(document.value).toEqual('formatted');
    expect(document.isSanitized).toBeFalsy();
  });

  it('should validate props itself', () => {
    const { sut } = makeSut();

    const testable = sut.make(nullAsType());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate document type', () => {
    const { sut } = makeSut();

    const testable = sut.make({
      toSanitize: false,
      value: 'any',
      type: 'to return error' as DocumentType
    });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(InvalidDocumentType);
  });

  describe('plain value pattern validation', () => {
    it('should validate cnpj pattern', () => {
      const { sut, fakeDocumentProvider } = makeSut();

      jest.spyOn(fakeDocumentProvider, 'isValidCnpj').mockImplementation(() => false);

      const testable = sut.make({
        value: 'cnpj',
        toSanitize: false,
        type: 'CNPJ'
      });

      expect(testable.isLeft()).toBeTruthy();
      expect((testable.value as InvalidDocumentPattern).message).toEqual('Value must follow CNPJ pattern');
    });

    it('should validate cpf pattern', () => {
      const { sut, fakeDocumentProvider } = makeSut();

      jest.spyOn(fakeDocumentProvider, 'isValidCpf').mockImplementation(() => false);

      const testable = sut.make({
        value: 'cpf',
        toSanitize: false,
        type: 'CPF'
      });

      expect(testable.isLeft()).toBeTruthy();
      expect((testable.value as InvalidDocumentPattern).message).toEqual('Value must follow CPF pattern');
    });
  });
});
