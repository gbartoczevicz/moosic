import { Controller, HttpRequest, HttpResponse } from '@/ports/http';
import { CreateEstablishmentUseCase } from '@/domain/use-cases';
import { CreateEstablishmentDTO } from '@/domain/use-cases/dtos';
import { InfraError } from '@/ports/errors';
import { badRequest, ok, serverError } from '@/ports/http/helpers';

export class CreateEstablishmentController implements Controller {
  private readonly createEstablishmentUseCase: CreateEstablishmentUseCase;

  public constructor(createEstablishmentUseCase: CreateEstablishmentUseCase) {
    this.createEstablishmentUseCase = createEstablishmentUseCase;
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = {
      ...request.body,
      restaurateurId: request.applicationData.restaurateurId
    } as CreateEstablishmentDTO;

    const establishmentOrError = await this.createEstablishmentUseCase.execute(dto);

    if (establishmentOrError.isLeft()) {
      const error = establishmentOrError.value;

      if (error instanceof InfraError) {
        console.warn(error);
        return serverError();
      }

      return badRequest(error);
    }

    return ok(establishmentOrError.value.toPlain());
  }
}
