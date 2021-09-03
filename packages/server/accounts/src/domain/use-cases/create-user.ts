import { Either, left } from '@shared/utils';
import { UserFactory } from '@/domain/factories';
import { UsersRepo } from '@/ports/database';
import { CreateUserDTO } from '@/domain/use-cases/dtos';
import { EmailAlreadyInUse, PhoneAlreadyInUse } from '@/domain/use-cases/errors';
import { FieldIsRequired, InvalidEmail, MinimumLength, PropsAreRequired } from '@/domain/entities/errors';
import { InvalidPhonePattern } from '@/domain/factories/errors';
import { InfraError } from '@/ports/errors';
import { User } from '@/domain/entities';

type UseCaseErrors =
  | PropsAreRequired
  | InvalidEmail
  | MinimumLength
  | FieldIsRequired
  | InvalidPhonePattern
  | InfraError
  | PhoneAlreadyInUse
  | EmailAlreadyInUse;

export class CreateUserUseCase {
  private readonly userFactory: UserFactory;

  private readonly usersRepo: UsersRepo;

  public constructor(userFactory: UserFactory, usersRepo: UsersRepo) {
    this.userFactory = userFactory;
    this.usersRepo = usersRepo;
  }

  public async execute(dto: CreateUserDTO): Promise<Either<UseCaseErrors, User>> {
    const userOrError = await this.userFactory.make({
      id: {},
      name: dto.name,
      email: dto.email,
      password: {
        value: dto.password,
        toEncode: true
      },
      phone: {
        value: dto.phone
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
