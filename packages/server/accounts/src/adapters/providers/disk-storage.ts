import fs from 'fs';
import path from 'path';
import { StorageProvider } from '@/ports/providers';

export class DiskStorageProvider implements StorageProvider {
  private readonly temporaryDir: string;

  private readonly uploadsDir: string;

  public constructor(temporaryDir: string, uploadsDir: string) {
    this.temporaryDir = temporaryDir;
    this.uploadsDir = uploadsDir;
  }

  public async save(filename: string): Promise<string> {
    await fs.promises.rename(path.resolve(this.temporaryDir, filename), path.resolve(this.uploadsDir, filename));

    return filename;
  }

  public async delete(filename: string): Promise<void> {
    const filePath = path.resolve(this.uploadsDir, filename);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
