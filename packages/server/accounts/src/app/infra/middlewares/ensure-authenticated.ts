import { Request, Response, NextFunction } from 'express';

import { forbidden } from '@/ports/http/helpers';
import { makeSetSessionMiddleware } from '@/app/factories';

const setSessionUseCase = makeSetSessionMiddleware().middleware;

export const ensureAuthenticated = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const idOrError = setSessionUseCase.execute({ bearer: String(request.headers.authorization) });

    if (idOrError.isLeft()) {
      console.warn(idOrError.value);

      return response.sendStatus(forbidden().statusCode);
    }

    const id = idOrError.value;

    request.applicationData = {
      userId: id.value
    };

    return next();
  };
};
