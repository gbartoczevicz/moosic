import { Controller, HttpRequest, HttpResponse } from '@/ports/http';
import { CreateUserUseCase } from '@/domain/use-cases';
import { CreateUserDTO } from '@/domain/use-cases/dtos';
import { InfraError } from '@/ports/errors';
import { badRequest, ok, serverError } from '@/ports/http/helpers';

export class CreateUserController implements Controller {
  private readonly createUserUseCase: CreateUserUseCase;

  public constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    const userOrError = await this.createUserUseCase.execute(request.body as CreateUserDTO);

    if (userOrError.isLeft()) {
      const error = userOrError.value;

      if (error instanceof InfraError) {
        console.warn(error);
        return serverError();
      }

      return badRequest(error);
    }

    return ok(userOrError.value);
  }
}
