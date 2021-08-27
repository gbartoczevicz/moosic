export interface IdProvider {
  generate(value?: string): string;
}
