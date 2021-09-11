import { JwtProvider } from '@/ports/providers';
import { SetSessionDTO } from '@/domain/use-cases/dtos';
import { Either, left } from '@/utils';
import { FieldIsRequired } from '@/domain/entities/errors';
import { InvalidCredentials } from '@/domain/use-cases/errors';
import { IdFactory } from '@/domain/factories';
import { Id } from '@/domain/entities/values';

type UseCaseEither = Either<InvalidCredentials | FieldIsRequired, Id>;

export class SetSessionUseCase {
  private readonly jwtProvider: JwtProvider;

  private readonly idFactory: IdFactory;

  private readonly secret: string;

  private readonly bearerPrefix = 'Bearer ';

  public constructor(jwtProvider: JwtProvider, idFactory: IdFactory, secret: string) {
    this.jwtProvider = jwtProvider;
    this.idFactory = idFactory;
    this.secret = secret;
  }

  public execute(props: SetSessionDTO): UseCaseEither {
    const { bearer } = props;

    if (!bearer) {
      return left(new InvalidCredentials());
    }

    const [, token] = bearer.split(this.bearerPrefix);

    if (!token) {
      return left(new InvalidCredentials());
    }

    let decoded: string;

    try {
      decoded = this.jwtProvider.verify(token, this.secret);
    } catch (err) {
      return left(new InvalidCredentials());
    }

    return this.idFactory.make({ value: decoded });
  }
}
