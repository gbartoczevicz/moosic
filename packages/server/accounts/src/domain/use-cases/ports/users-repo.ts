import { Either } from '@shared/utils';
import { User } from '@/domain/entities/user';
import { InfraError } from '@/domain/use-cases/ports/errors';
import { Email, Phone } from '@/domain/entities/values';

export type Save = Either<InfraError, User>;
export type FindUnique = Either<InfraError, User | null>;

export interface UsersRepo {
  save(user: User): Promise<Save>;
  findByEmail(email: Email): Promise<FindUnique>;
  findByPhone(phone: Phone): Promise<FindUnique>;
}
