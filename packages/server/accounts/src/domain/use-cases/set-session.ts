import { JwtProvider } from '@/ports/providers';
import { SetSessionDTO } from '@/domain/use-cases/dtos';
import { left, right } from '@/utils';
import { PropsAreRequired } from '@/domain/entities/errors';
import { InvalidCredentials } from '@/domain/use-cases/errors';
import { IdFactory } from '@/domain/factories';

export class GetUserFromBearer {
  private readonly jwtProvider: JwtProvider;

  private readonly idFactory: IdFactory;

  private readonly secret: string;

  private readonly bearerPrefix = 'Authorization: Bearer ';

  public constructor(jwtProvider: JwtProvider, idFactory: IdFactory, secret: string) {
    this.jwtProvider = jwtProvider;
    this.idFactory = idFactory;
    this.secret = secret;
  }

  public execute(props: SetSessionDTO) {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { bearer } = props;

    const [, token] = bearer?.split(this.bearerPrefix);

    if (!token) {
      return left(new InvalidCredentials());
    }

    let decoded;

    try {
      decoded = this.jwtProvider.verify(token, this.secret);
    } catch {
      return left(new InvalidCredentials());
    }

    const idOrError = this.idFactory.make({ value: decoded });

    if (idOrError.isLeft()) {
      return left(idOrError.value);
    }

    return right(idOrError.value);
  }
}
