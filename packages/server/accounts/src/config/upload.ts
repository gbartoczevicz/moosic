import { resolve } from 'path';
import { assertAndReturn, getEnumByValue } from '@/utils';

const temporaryDir = resolve(__dirname, '..', '..', 'temp');

// eslint-disable-next-line no-shadow
export enum StorageDriver {
  disk = 'DISK',
  s3 = 'S3'
}

const rawStorageDriver = assertAndReturn(process.env.STORAGE_DRIVER);

const storageDriver = assertAndReturn(getEnumByValue(StorageDriver, rawStorageDriver));

const uploadConfig = {
  temporaryDir,
  uploadsDir: resolve(temporaryDir, 'uploads'),
  storageDriver,
  drivers: {
    [StorageDriver.disk]: {},
    [StorageDriver.s3]: {
      bucket: assertAndReturn(process.env.BUCKET),
      accessKeyId: assertAndReturn(process.env.AWS_ACCESS_KEY_ID),
      secretAccessKey: assertAndReturn(process.env.AWS_SECRET_ACCESS_KEY_ID),
      region: assertAndReturn(process.env.AWS_DEFAULT_REGION)
    }
  }
};

export default uploadConfig;
