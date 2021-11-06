import { assertAndReturn, getEnumByValue } from '@/utils';
import { resolve } from 'path';

const temporaryDir = resolve(__dirname, '..', '..', 'temp');

// eslint-disable-next-line no-shadow
export enum StorageDriver {
  disk = 'DISK',
  s3 = 'S3'
}

const rawStorageDriver = assertAndReturn(process.env.STORAGE_DRIVER);

const nullishDriver = getEnumByValue(StorageDriver, rawStorageDriver);

if (!nullishDriver) throw new Error('Driver is null');

const uploadConfig = {
  temporaryDir,
  uploadsDir: resolve(temporaryDir, 'uploads'),
  storageDriver: nullishDriver
};

export default uploadConfig;
