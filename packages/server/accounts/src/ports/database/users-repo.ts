import { Either } from '@/utils';
import { User } from '@/domain/entities/user';
import { InfraError } from '@/ports/errors';
import { Email, Id, Phone } from '@/domain/entities/values';

export type SaveUser = Either<InfraError, User>;
export type FindUniqueUser = Either<InfraError, User | null>;

export interface UsersRepo {
  save(user: User): Promise<SaveUser>;
  findById(id: Id): Promise<FindUniqueUser>;
  findByEmail(email: Email): Promise<FindUniqueUser>;
  findByPhone(phone: Phone): Promise<FindUniqueUser>;
}
