import { Controller, HttpRequest, HttpResponse } from '@/ports/http';
import { CreateRestaurateurUseCase } from '@/domain/use-cases';
import { CreateRestaurateurDTO } from '@/domain/use-cases/dtos';
import { InfraError } from '@/ports/errors';
import { badRequest, ok, serverError } from '@/ports/http/helpers';

export class CreateRestaurateurController implements Controller {
  private readonly createRestaurateurUseCase: CreateRestaurateurUseCase;

  public constructor(createRestaurateurUseCase: CreateRestaurateurUseCase) {
    this.createRestaurateurUseCase = createRestaurateurUseCase;
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    const restaurateurOrError = await this.createRestaurateurUseCase.execute(request.body as CreateRestaurateurDTO);

    if (restaurateurOrError.isLeft()) {
      const error = restaurateurOrError.value;

      if (error instanceof InfraError) {
        console.warn(error);
        return serverError();
      }

      return badRequest(error);
    }

    return ok(restaurateurOrError.value.toPlain());
  }
}
