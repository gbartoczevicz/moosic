export interface PhoneProvider {
  validate(value: string): boolean;
  format(value: string): string;
  sanitize(value: string): string;
}
