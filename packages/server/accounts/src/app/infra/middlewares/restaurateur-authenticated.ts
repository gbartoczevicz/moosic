import { Request, Response, NextFunction } from 'express';

import { forbidden } from '@/ports/http/helpers';
import { getRestaurateurUseCase } from '@/app/factories/use-cases';

export const restaurateurAuthenticated = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const restaurateurOrError = await getRestaurateurUseCase.execute({
      userId: String(request.applicationData.userId)
    });

    if (restaurateurOrError.isLeft()) {
      return response.sendStatus(forbidden().statusCode);
    }

    const restaurateur = restaurateurOrError.value;

    request.applicationData = {
      restaurateurId: restaurateur.id.value
    };

    return next();
  };
};
