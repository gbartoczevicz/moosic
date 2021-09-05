import { RestaurateurRepo, SaveRestaurateur, FindUniqueRestaurateur } from '@/ports/database';
import { RestaurateurMapper } from '@/adapters/database/prisma/mappers';
import { Restaurateur } from '@/domain/entities';
import { left, right } from '@shared/utils';
import { InfraError } from '@/ports/errors';
import { prismaClient } from '@/adapters/database/prisma';
import { Document } from '@/domain/entities/values';

export class PrismaRestaurateurRepo implements RestaurateurRepo {
  private readonly restaurateurMapper: RestaurateurMapper;

  public constructor(restaurateurMapper: RestaurateurMapper) {
    this.restaurateurMapper = restaurateurMapper;
  }

  public async save(restaurateur: Restaurateur): Promise<SaveRestaurateur> {
    try {
      const persistence = this.restaurateurMapper.toPersistence(restaurateur);

      const savedPersistence = await prismaClient.restaurateur.upsert({
        create: persistence,
        update: persistence,
        where: {
          id: persistence.id
        }
      });

      const domain = this.restaurateurMapper.toDomain(savedPersistence);

      return right(domain);
    } catch (err) {
      return left(new InfraError(err.message));
    }
  }

  public async findByDocument(document: Document): Promise<FindUniqueRestaurateur> {
    try {
      const savedPersistence = await prismaClient.restaurateur.findUnique({
        where: {
          document: document.value
        }
      });

      if (!savedPersistence) {
        return right(null);
      }

      const domain = this.restaurateurMapper.toDomain(savedPersistence);

      return right(domain);
    } catch (err) {
      return left(new InfraError(err.message));
    }
  }
}
