import { DocumentHandler } from '@/domain/factories/ports/document-handler';

export class FakeDocumentHandler implements DocumentHandler {
  formatCnpj(document: string): string {
    return 'formatted cnpj';
  }

  formatCpf(document: string): string {
    return 'formatted cpf';
  }

  isValidCnpj(document: string): boolean {
    return true;
  }

  isValidCpf(document: string): boolean {
    return true;
  }

  sanitize(document: string): string {
    return 'sanitized document';
  }
}
