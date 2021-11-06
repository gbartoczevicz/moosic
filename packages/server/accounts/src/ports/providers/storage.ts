export interface StorageProvider {
  save(filename: string): Promise<string>;
  delete(filename: string): Promise<void>;
}
