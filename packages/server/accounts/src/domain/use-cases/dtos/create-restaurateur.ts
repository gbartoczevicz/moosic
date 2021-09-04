import { DocumentType } from '@/domain/entities/values';

export interface CreateRestaurateurDTO {
  userId: string;
  document: {
    value: string;
    type: DocumentType;
  };
}
