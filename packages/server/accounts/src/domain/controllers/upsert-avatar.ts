import { Controller, HttpRequest, HttpResponse } from '@/ports/http';
import { UpsertAvatarUseCase } from '@/domain/use-cases';
import { UpsertAvatarDTO } from '@/domain/use-cases/dtos';
import { InfraError } from '@/ports/errors';
import { badRequest, ok, serverError } from '@/ports/http/helpers';

export class UpsertAvatarController implements Controller {
  private readonly usertAvatarUseCase: UpsertAvatarUseCase;

  public constructor(usertAvatarUseCase: UpsertAvatarUseCase) {
    this.usertAvatarUseCase = usertAvatarUseCase;
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    const avatarOrError = await this.usertAvatarUseCase.execute({
      filename: request.file.filename,
      userId: request.applicationData.userId
    } as UpsertAvatarDTO);

    if (avatarOrError.isLeft()) {
      const error = avatarOrError.value;

      if (error instanceof InfraError) {
        console.warn(error);
        return serverError();
      }

      return badRequest(error);
    }

    return ok(avatarOrError.value.toPlain());
  }
}
