import { left, right } from '@/utils';
import { prismaClient } from '@/adapters/database/prisma';
import { FindUniqueUser, SaveUser, UsersRepo } from '@/ports/database';
import { UserMapper } from '@/adapters/database/prisma/mappers';
import { User } from '@/domain/entities';
import { InfraError } from '@/ports/errors';
import { Email, Id, Phone } from '@/domain/entities/values';

export class PrismaUsersRepo implements UsersRepo {
  private readonly userMapper: UserMapper;

  public constructor(userMapper: UserMapper) {
    this.userMapper = userMapper;
  }

  public async save(user: User): Promise<SaveUser> {
    try {
      const persistence = this.userMapper.toPersistence(user);

      const savedPersistence = await prismaClient.user.upsert({
        create: persistence,
        update: persistence,
        where: {
          id: persistence.id
        }
      });

      const domain = await this.userMapper.toDomain(savedPersistence);

      return right(domain);
    } catch (err) {
      return left(new InfraError(err.message));
    }
  }

  public async findById(id: Id): Promise<FindUniqueUser> {
    try {
      const savedPersistence = await prismaClient.user.findUnique({
        where: {
          id: id.value
        }
      });

      if (!savedPersistence) {
        return right(null);
      }

      const domain = await this.userMapper.toDomain(savedPersistence);

      return right(domain);
    } catch (err) {
      return left(new InfraError(err.message));
    }
  }

  public async findByEmail(email: Email): Promise<FindUniqueUser> {
    try {
      const savedPersistence = await prismaClient.user.findUnique({
        where: {
          email: email.value
        }
      });

      if (!savedPersistence) {
        return right(null);
      }

      const domain = await this.userMapper.toDomain(savedPersistence);

      return right(domain);
    } catch (err) {
      return left(new InfraError(err.message));
    }
  }

  public async findByPhone(phone: Phone): Promise<FindUniqueUser> {
    try {
      const savedPersistence = await prismaClient.user.findUnique({
        where: {
          phone: phone.value
        }
      });

      if (!savedPersistence) {
        return right(null);
      }

      const domain = await this.userMapper.toDomain(savedPersistence);

      return right(domain);
    } catch (err) {
      return left(new InfraError(err.message));
    }
  }
}
