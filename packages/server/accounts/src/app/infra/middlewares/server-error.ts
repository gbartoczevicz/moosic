import { Request, Response, NextFunction } from 'express';

import { serverError } from '@/ports/http/helpers';

export const handleServerError = () => {
  // eslint-disable-next-line no-unused-vars
  return async (error: Error, request: Request, response: Response, _: NextFunction) => {
    console.log({
      error,
      request: {
        uri: request.url,
        headers: request.headers,
        body: request.body
      }
    });

    return response.sendStatus(serverError().statusCode);
  };
};
