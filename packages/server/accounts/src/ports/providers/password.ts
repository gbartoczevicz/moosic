export interface PasswordProvider {
  encode(valueToEncode: string, salt: number): Promise<string>;
  compare(valueToCompare: string, hash: string): Promise<boolean>;
}
