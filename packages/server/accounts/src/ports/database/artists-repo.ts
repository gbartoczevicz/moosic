import { Either } from '@/utils';
import { InfraError } from '@/ports/errors';
import { Artist } from '@/domain/entities';
import { Document, Id } from '@/domain/entities/values';

export type SaveArtist = Either<InfraError, Artist>;
export type FindUniqueArtist = Either<InfraError, Artist | null>;

export interface ArtistsRepo {
  save(artist: Artist): Promise<SaveArtist>;
  findByUserId(userId: Id): Promise<FindUniqueArtist>;
  findByDocument(document: Document): Promise<FindUniqueArtist>;
}
