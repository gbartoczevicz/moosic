import { UsersRepo } from '@/ports/database';
import { JwtProvider, PasswordProvider } from '@/ports/providers';
import { CreateSessionDTO } from '@/domain/use-cases/dtos';
import { Email } from '@/domain/entities/values';
import { Either, left, right } from '@/utils';
import { InvalidCredentials, UserNotFound } from '@/domain/use-cases/errors';
import { User } from '@/domain/entities';
import { InvalidEmail, PropsAreRequired } from '@/domain/entities/errors';
import { InfraError } from '@/ports/errors';

type UseCaseEither = Either<
  InvalidEmail | PropsAreRequired | InfraError | UserNotFound | InvalidCredentials,
  { token: string; user: User }
>;

type TokenOptions = {
  secret: string;
  expiresAt: number;
};

export class CreateSessionUseCase {
  private readonly usersRepo: UsersRepo;

  private readonly passwordProvider: PasswordProvider;

  private readonly jwtProvider: JwtProvider;

  private readonly tokenOptions: TokenOptions;

  public constructor(
    usersRepo: UsersRepo,
    passwordProvider: PasswordProvider,
    jwtProvider: JwtProvider,
    tokenOptions: TokenOptions
  ) {
    this.usersRepo = usersRepo;
    this.passwordProvider = passwordProvider;
    this.jwtProvider = jwtProvider;
    this.tokenOptions = tokenOptions;
  }

  public async execute(dto: CreateSessionDTO): Promise<UseCaseEither> {
    const emailOrError = Email.create({ value: dto.email });

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    const userExistsOrError = await this.usersRepo.findByEmail(emailOrError.value);

    if (userExistsOrError.isLeft()) {
      return left(userExistsOrError.value);
    }

    if (!userExistsOrError.value) {
      return left(new UserNotFound());
    }

    const user = userExistsOrError.value;

    const doesPasswordMatch = await this.passwordProvider.compare(dto.password, user.password.value);

    if (!doesPasswordMatch) {
      return left(new InvalidCredentials());
    }

    const token = this.jwtProvider.sign(
      {
        userId: user.id.value
      },
      this.tokenOptions.secret,
      {
        expiresIn: this.tokenOptions.expiresAt
      }
    );

    return right({ token, user });
  }
}
