export interface PhoneProvider {
  validate(value: string): boolean;
  sanitize(value: string): string;
}
