import { Controller, HttpRequest, HttpResponse } from '@/ports/http';
import { UpsertLocationUseCase } from '@/domain/use-cases';
import { UpsertLocationDTO } from '@/domain/use-cases/dtos';
import { InfraError } from '@/ports/errors';
import { badRequest, ok, serverError } from '@/ports/http/helpers';

export class UpsertLocationController implements Controller {
  private readonly usertLocationUseCase: UpsertLocationUseCase;

  public constructor(usertLocationUseCase: UpsertLocationUseCase) {
    this.usertLocationUseCase = usertLocationUseCase;
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    const locationOrError = await this.usertLocationUseCase.execute(request.body as UpsertLocationDTO);

    if (locationOrError.isLeft()) {
      const error = locationOrError.value;

      if (error instanceof InfraError) {
        console.warn(error);
        return serverError();
      }

      return badRequest(error);
    }

    return ok(locationOrError.value.toPlain());
  }
}
