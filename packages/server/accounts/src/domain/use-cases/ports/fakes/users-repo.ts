import { right } from '@shared/utils';
import { User } from '@/domain/entities/user';
import { Email, Password, Phone } from '@/domain/entities/values';
import { UsersRepo, Save, FindUnique } from '@/domain/use-cases/ports/users-repo';
import { makeEmail, makePassword, makePhone } from '@/domain/entities/values/fakes';
import { makeUser } from '@/domain/entities/fakes';

export class FakeUsersRepo implements UsersRepo {
  public async save(user: User): Promise<Save> {
    return Promise.resolve(right(user));
  }

  public async findByEmail(email: Email): Promise<FindUnique> {
    const password = makePassword({ isHashed: true }).value as Password;
    const phone = makePhone({ isSanitized: true }).value as Phone;

    const user = makeUser({
      email,
      password,
      phone
    }).value as User;

    return Promise.resolve(right(user));
  }

  public async findByPhone(phone: Phone): Promise<FindUnique> {
    const password = makePassword({ isHashed: true }).value as Password;
    const email = makeEmail({}).value as Email;

    const user = makeUser({
      email,
      password,
      phone
    }).value as User;

    return Promise.resolve(right(user));
  }
}
