import { EstablishmentsRepo, FindUniqueEstablishment, SaveEstablishment } from '@/ports/database';
import { EstablishmentMapper } from '@/adapters/database/prisma/mappers';
import { Establishment } from '@/domain/entities';
import { prismaClient } from '@/adapters/database/prisma';
import { left, right } from '@/utils';
import { InfraError } from '@/ports/errors';
import { Phone } from '@/domain/entities/values';

export class PrismaEstablishmentsRepo implements EstablishmentsRepo {
  private readonly establishmentMapper: EstablishmentMapper;

  public constructor(establishmentMapper: EstablishmentMapper) {
    this.establishmentMapper = establishmentMapper;
  }

  public async save(establishment: Establishment): Promise<SaveEstablishment> {
    try {
      const persistence = this.establishmentMapper.toPersistence(establishment);

      const savedPersistence = await prismaClient.establishment.upsert({
        create: persistence,
        update: persistence,
        where: {
          id: persistence.id
        }
      });

      const domain = this.establishmentMapper.toDomain(savedPersistence);

      return right(domain);
    } catch (err) {
      return left(new InfraError(err.message));
    }
  }

  public async findByPhone(phone: Phone): Promise<FindUniqueEstablishment> {
    try {
      const savedPersistence = await prismaClient.establishment.findUnique({
        where: {
          phone: phone.value
        }
      });

      const domain = savedPersistence ? this.establishmentMapper.toDomain(savedPersistence) : null;

      return right(domain);
    } catch (err) {
      return left(new InfraError(err.message));
    }
  }
}
