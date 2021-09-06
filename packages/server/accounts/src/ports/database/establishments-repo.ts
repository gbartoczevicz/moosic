import { Either } from '@shared/utils';
import { InfraError } from '@/ports/errors';
import { Establishment } from '@/domain/entities';
import { Phone } from '@/domain/entities/values';

export type SaveEstablishment = Either<InfraError, Establishment>;
export type FindUniqueEstablishment = Either<InfraError, Establishment | null>;

export interface EstablishmentsRepo {
  save(establishment: Establishment): Promise<SaveEstablishment>;
  findByPhone(phone: Phone): Promise<FindUniqueEstablishment>;
}
