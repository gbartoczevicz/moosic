import { Controller, HttpRequest, HttpResponse } from '@/ports/http';
import { CreateArtistUseCase } from '@/domain/use-cases';
import { CreateArtistDTO } from '@/domain/use-cases/dtos';
import { InfraError } from '@/ports/errors';
import { badRequest, ok, serverError } from '@/ports/http/helpers';

export class CreateArtistController implements Controller {
  private readonly createArtistUseCase: CreateArtistUseCase;

  public constructor(createArtistUseCase: CreateArtistUseCase) {
    this.createArtistUseCase = createArtistUseCase;
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = {
      ...request.body,
      userId: request.applicationData.userId
    } as CreateArtistDTO;

    const artistOrError = await this.createArtistUseCase.execute(dto);

    if (artistOrError.isLeft()) {
      const error = artistOrError.value;

      if (error instanceof InfraError) {
        console.warn(error);
        return serverError();
      }

      return badRequest(error);
    }

    return ok(artistOrError.value.toPlain());
  }
}
