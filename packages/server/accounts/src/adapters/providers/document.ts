import * as Validator from 'cpf-cnpj-validator';
import { DocumentProvider } from '@/ports/providers';

export class DocumentProviderImpl implements DocumentProvider {
  public formatCnpj(document: string): string {
    return Validator.cnpj.format(document);
  }

  public formatCpf(document: string): string {
    return Validator.cpf.format(document);
  }

  public isValidCnpj(document: string): boolean {
    return Validator.cnpj.isValid(document);
  }

  public isValidCpf(document: string): boolean {
    return Validator.cpf.isValid(document);
  }

  public sanitizeCnpj(document: string): string {
    return Validator.cnpj.strip(document);
  }

  public sanitizeCpf(document: string): string {
    return Validator.cpf.strip(document);
  }
}
