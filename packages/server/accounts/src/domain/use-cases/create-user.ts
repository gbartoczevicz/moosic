import { left } from '@shared/utils';
import { UserFactory } from '@/domain/factories';
import { UsersRepo } from '@/domain/use-cases/ports/users-repo';
import { CreateUserDTO } from '@/domain/use-cases/dtos';
import { EmailAlreadyInUse, PhoneAlreadyInUse } from '@/domain/use-cases/errors';

export class CreateUserUseCase {
  private readonly userFactory: UserFactory;

  private readonly usersRepo: UsersRepo;

  public constructor(userFactory: UserFactory, usersRepo: UsersRepo) {
    this.userFactory = userFactory;
    this.usersRepo = usersRepo;
  }

  public async execute(dto: CreateUserDTO) {
    const userOrError = await this.userFactory.make({
      name: dto.name,
      email: dto.email,
      password: {
        value: dto.password,
        toEncode: true
      },
      phone: {
        value: dto.password,
        toSanitize: true
      }
    });

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user = userOrError.value;

    const userWithSamePhone = await this.usersRepo.findByPhone(user.phone);

    if (userWithSamePhone.isLeft()) {
      return left(userWithSamePhone.value);
    }

    if (userWithSamePhone.value) {
      return left(new PhoneAlreadyInUse());
    }

    const userWithSameEmail = await this.usersRepo.findByEmail(user.email);

    if (userWithSameEmail.isLeft()) {
      return left(userWithSameEmail.value);
    }

    if (userWithSameEmail.value) {
      return left(new EmailAlreadyInUse());
    }

    return this.usersRepo.save(user);
  }
}
