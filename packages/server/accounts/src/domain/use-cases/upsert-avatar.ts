import { Either, left } from '@/utils';
import { User } from '@/domain/entities';
import { InfraError } from '@/ports/errors';
import { StorageProvider } from '@/ports/providers';
import { UsersRepo } from '@/ports/database';
import { IdFactory, UserFactory } from '@/domain/factories';
import { UpsertAvatarDTO } from '@/domain/use-cases/dtos';
import { UserNotFound } from '@/domain/use-cases/errors';
import { FieldIsRequired, InvalidEmail, MinimumLength, PropsAreRequired } from '@/domain/entities/errors';
import { InvalidPhonePattern } from '@/domain/factories/errors';

type UseCaseEither = Either<
  InfraError | UserNotFound | PropsAreRequired | InvalidEmail | MinimumLength | FieldIsRequired | InvalidPhonePattern,
  User
>;

export class UpsertAvatarUseCase {
  private readonly storageProvider: StorageProvider;

  private readonly usersRepo: UsersRepo;

  private readonly userFactory: UserFactory;

  private readonly idFactory: IdFactory;

  public constructor(
    storageProvider: StorageProvider,
    usersRepo: UsersRepo,
    userFactory: UserFactory,
    idFactory: IdFactory
  ) {
    this.storageProvider = storageProvider;
    this.usersRepo = usersRepo;
    this.userFactory = userFactory;
    this.idFactory = idFactory;
  }

  public async execute(dto: UpsertAvatarDTO): Promise<UseCaseEither> {
    const idOrError = this.idFactory.make({ value: dto.userId });

    if (idOrError.isLeft()) return left(idOrError.value);

    const userFoundOrError = await this.usersRepo.findById(idOrError.value);

    if (userFoundOrError.isLeft()) return left(userFoundOrError.value);

    if (!userFoundOrError.value) return left(new UserNotFound());

    const user = userFoundOrError.value;

    /** @todo fix url later */
    if (user.avatar) {
      await this.storageProvider.delete(user.avatar);
    }

    const avatar = await this.storageProvider.save(dto.filename);

    const userToSaveOrError = await this.userFactory.make({
      id: { value: user.id.value },
      email: user.email.value,
      name: user.name,
      password: { value: user.password.value, toEncode: false },
      phone: { value: user.phone.value },
      avatar: { value: avatar, isGoingToPersist: true }
    });

    if (userToSaveOrError.isLeft()) return left(userToSaveOrError.value);

    const savedUserOrError = await this.usersRepo.save(userToSaveOrError.value);

    return savedUserOrError;
  }
}
