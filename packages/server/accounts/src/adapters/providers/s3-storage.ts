import fs from 'fs';
import path from 'path';
import { S3 } from 'aws-sdk';
import mime from 'mime';

import uploadConfig from '@/config/upload';
import { StorageProvider } from '@/ports/providers';

export class S3StorageProvider implements StorageProvider {
  private readonly temporaryDir: string;

  private readonly client: S3;

  public constructor(temporaryDir: string) {
    this.temporaryDir = temporaryDir;
    this.client = new S3({
      ...uploadConfig.drivers.S3
    });
  }

  public async save(file: string): Promise<string> {
    const originalPath = path.resolve(this.temporaryDir, file);

    const fileContent = await fs.promises.readFile(originalPath);

    const contentType = mime.getType(originalPath);

    if (!contentType) {
      throw new Error('File not found');
    }

    await this.client
      .putObject({
        Bucket: uploadConfig.drivers.S3.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: contentType,
        ContentDisposition: `inline; filename=${file}`
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async delete(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.drivers.S3.bucket,
        Key: file
      })
      .promise();
  }
}
