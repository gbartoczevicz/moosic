export interface DocumentProvider {
  formatCnpj(document: string): string;
  formatCpf(document: string): string;
  isValidCnpj(document: string): boolean;
  isValidCpf(document: string): boolean;
  sanitizeCnpj(document: string): string;
  sanitizeCpf(document: string): string;
}
