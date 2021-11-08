import * as Ports from '@/ports/providers';
import * as Adapters from '@/adapters/providers';
import uploadConfig, { StorageDriver } from '@/config/upload';

export const idProvider: Ports.IdProvider = new Adapters.IdProviderImpl();
export const passwordProvider: Ports.PasswordProvider = new Adapters.PasswordProviderImpl();
export const documentProvider: Ports.DocumentProvider = new Adapters.DocumentProviderImpl();
export const phoneProvider: Ports.PhoneProvider = new Adapters.PhoneProviderImpl();
export const jwtProvider: Ports.JwtProvider = new Adapters.JwtProviderImpl();

const StorageProviderImpl = {
  [StorageDriver.disk]: new Adapters.DiskStorageProvider(uploadConfig.temporaryDir, uploadConfig.uploadsDir),
  [StorageDriver.s3]: new Adapters.S3StorageProvider(uploadConfig.temporaryDir)
};

export const storageProvider: Ports.StorageProvider = StorageProviderImpl[uploadConfig.storageDriver];
