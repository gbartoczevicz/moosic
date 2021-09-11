import { Request, Response, NextFunction } from 'express';

import { forbidden } from '@/ports/http/helpers';
import { setSessionUseCase } from '@/app/factories/use-cases';

export const ensureAuthenticated = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const idOrError = setSessionUseCase.execute({ bearer: String(request.headers.authorization) });

    if (idOrError.isLeft()) {
      return response.sendStatus(forbidden().statusCode);
    }

    const id = idOrError.value;

    request.applicationData = {
      userId: id.value
    };

    return next();
  };
};
