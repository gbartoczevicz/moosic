import { Either } from '@/utils';
import { InfraError } from '@/ports/errors';
import { Establishment } from '@/domain/entities';
import { Id, Phone } from '@/domain/entities/values';

export type SaveEstablishment = Either<InfraError, Establishment>;
export type FindUniqueEstablishment = Either<InfraError, Establishment | null>;

export interface EstablishmentsRepo {
  save(establishment: Establishment): Promise<SaveEstablishment>;
  findById(id: Id): Promise<FindUniqueEstablishment>;
  findByPhone(phone: Phone): Promise<FindUniqueEstablishment>;
}
