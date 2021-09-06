import { Either } from '@shared/utils';
import { InfraError } from '@/ports/errors';
import { Restaurateur } from '@/domain/entities';
import { Document, Id } from '@/domain/entities/values';

export type SaveRestaurateur = Either<InfraError, Restaurateur>;
export type FindUniqueRestaurateur = Either<InfraError, Restaurateur | null>;

export interface RestaurateurRepo {
  save(restaurateur: Restaurateur): Promise<SaveRestaurateur>;
  findByUserId(userId: Id): Promise<FindUniqueRestaurateur>;
  findByDocument(document: Document): Promise<FindUniqueRestaurateur>;
}
