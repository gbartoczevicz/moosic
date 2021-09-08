import { Controller, HttpRequest, HttpResponse } from '@/ports/http';
import { CreateSessionUseCase } from '@/domain/use-cases';
import { CreateSessionDTO } from '@/domain/use-cases/dtos';
import { InfraError } from '@/ports/errors';
import { badRequest, forbidden, ok, serverError } from '@/ports/http/helpers';
import { InvalidCredentials, UserNotFound } from '../use-cases/errors';

export class CreateSessionController implements Controller {
  private readonly createSessionUseCase: CreateSessionUseCase;

  public constructor(createSessionUseCase: CreateSessionUseCase) {
    this.createSessionUseCase = createSessionUseCase;
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    const sessionOrError = await this.createSessionUseCase.execute(request.body as CreateSessionDTO);

    if (sessionOrError.isLeft()) {
      const error = sessionOrError.value;

      if (error instanceof InfraError) {
        console.warn(error);

        return serverError();
      }

      if (error instanceof UserNotFound || error instanceof InvalidCredentials) {
        console.warn(error);

        return forbidden();
      }

      return badRequest(error);
    }

    const { token, user } = sessionOrError.value;

    return ok({
      ...user.toPlain(),
      token
    });
  }
}
