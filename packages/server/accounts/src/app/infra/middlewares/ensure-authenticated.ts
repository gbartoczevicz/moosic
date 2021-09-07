import { Request, Response, NextFunction } from 'express';

import { forbidden } from '@/ports/http/helpers';

/** @todo use jwt token */
export const ensureAuthenticated = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const forbiddenStatus = forbidden().statusCode;

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.sendStatus(forbiddenStatus);
    }

    const [, userId] = authHeader.split('user_id:');

    if (!userId) {
      return response.sendStatus(forbiddenStatus);
    }

    request.applicationData = { userId };

    return next();
  };
};
