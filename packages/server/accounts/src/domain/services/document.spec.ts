import { DocumentService } from '@/domain/services/document';
import { FakeDocumentHandler } from '@/domain/services/ports/fakes';
import { Document } from '../entities/values';
import { InvalidDocumentPattern } from './errors';

const makeSut = () => {
  const fakeDocumentHandler = new FakeDocumentHandler();

  return {
    sut: new DocumentService(fakeDocumentHandler),
    fakeDocumentHandler
  };
};

describe('Document Service Unitary Tests', () => {
  it('should create a sanitized cnpj', () => {
    const { sut } = makeSut();

    const testable = sut.createDocumentFromPlainCpnjValue('cnpj value', true);

    expect(testable.isRight()).toBeTruthy();

    const document = testable.value as Document;

    expect(document.value).toEqual('sanitized document');
    expect(document.isSanitized).toBeTruthy();
  });

  it('should create a unsanitized cnpj', () => {
    const { sut } = makeSut();

    const testable = sut.createDocumentFromPlainCpnjValue('cnpj value', false);

    expect(testable.isRight()).toBeTruthy();

    const document = testable.value as Document;

    expect(document.value).toEqual('formatted cnpj');
    expect(document.isSanitized).toBeFalsy();
  });

  it('should create a sanitized cpf', () => {
    const { sut } = makeSut();

    const testable = sut.createDocumentFromPlainCpfValue('cpf value', true);

    expect(testable.isRight()).toBeTruthy();

    const document = testable.value as Document;

    expect(document.value).toEqual('sanitized document');
    expect(document.isSanitized).toBeTruthy();
  });

  it('should create a unsanitized cpf', () => {
    const { sut } = makeSut();

    const testable = sut.createDocumentFromPlainCpfValue('cpf value', false);

    expect(testable.isRight()).toBeTruthy();

    const document = testable.value as Document;

    expect(document.value).toEqual('formatted cpf');
    expect(document.isSanitized).toBeFalsy();
  });

  describe('plain value pattern validation', () => {
    it('should validate cnpj pattern', () => {
      const { sut, fakeDocumentHandler } = makeSut();

      jest.spyOn(fakeDocumentHandler, 'isValidCnpj').mockImplementation(() => false);

      const testable = sut.createDocumentFromPlainCpnjValue('document', false);

      expect(testable.isLeft()).toBeTruthy();
      expect((testable.value as InvalidDocumentPattern).message).toEqual('Value must follow CNPJ pattern');
    });

    it('should validate cpf pattern', () => {
      const { sut, fakeDocumentHandler } = makeSut();

      jest.spyOn(fakeDocumentHandler, 'isValidCpf').mockImplementation(() => false);

      const testable = sut.createDocumentFromPlainCpfValue('document', false);

      expect(testable.isLeft()).toBeTruthy();
      expect((testable.value as InvalidDocumentPattern).message).toEqual('Value must follow CPF pattern');
    });
  });
});
