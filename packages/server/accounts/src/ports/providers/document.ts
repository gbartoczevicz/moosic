export interface DocumentProvider {
  formatCnpj(document: string): string;
  formatCpf(document: string): string;
  isValidCnpj(document: string): boolean;
  isValidCpf(document: string): boolean;
  sanitize(document: string): string;
}
