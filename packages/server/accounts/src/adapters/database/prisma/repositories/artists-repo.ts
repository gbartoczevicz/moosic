import { ArtistsRepo, SaveArtist, FindUniqueArtist } from '@/ports/database';
import { ArtistMapper } from '@/adapters/database/prisma/mappers';
import { Artist } from '@/domain/entities';
import { left, right } from '@/utils';
import { InfraError } from '@/ports/errors';
import { prismaClient } from '@/adapters/database/prisma';
import { Document, Id } from '@/domain/entities/values';

export class PrismaArtistsRepo implements ArtistsRepo {
  private readonly artistMapper: ArtistMapper;

  public constructor(artistMapper: ArtistMapper) {
    this.artistMapper = artistMapper;
  }

  public async save(artist: Artist): Promise<SaveArtist> {
    try {
      const persistence = this.artistMapper.toPersistence(artist);

      const savedPersistence = await prismaClient.artist.upsert({
        create: persistence,
        update: persistence,
        where: {
          id: persistence.id
        }
      });

      const domain = this.artistMapper.toDomain(savedPersistence);

      return right(domain);
    } catch (err) {
      return left(new InfraError(err.message));
    }
  }

  public async findByUserId(userId: Id): Promise<FindUniqueArtist> {
    try {
      const savedPersistence = await prismaClient.artist.findUnique({
        where: {
          userId: userId.value
        }
      });

      const domain = savedPersistence ? this.artistMapper.toDomain(savedPersistence) : null;

      return right(domain);
    } catch (err) {
      return left(new InfraError(err.message));
    }
  }

  public async findByDocument(document: Document): Promise<FindUniqueArtist> {
    try {
      const savedPersistence = await prismaClient.artist.findUnique({
        where: {
          document: document.value
        }
      });

      const domain = savedPersistence ? this.artistMapper.toDomain(savedPersistence) : null;

      return right(domain);
    } catch (err) {
      return left(new InfraError(err.message));
    }
  }
}
