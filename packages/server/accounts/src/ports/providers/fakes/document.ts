import { DocumentProvider } from '@/ports/providers';

export class FakeDocumentProvider implements DocumentProvider {
  formatCnpj(document: string): string {
    return 'formatted';
  }

  formatCpf(document: string): string {
    return 'formatted';
  }

  isValidCnpj(document: string): boolean {
    return true;
  }

  isValidCpf(document: string): boolean {
    return true;
  }

  sanitizeCnpj(document: string): string {
    return 'sanitized';
  }

  sanitizeCpf(document: string): string {
    return 'sanitized';
  }
}
