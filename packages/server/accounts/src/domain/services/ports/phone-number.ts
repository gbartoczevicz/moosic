export interface PhoneNumber {
  validate(value: string): boolean;
  format(value: string): string;
  sanitize(value: string): string;
}
