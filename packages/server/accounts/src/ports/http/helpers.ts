import { HttpResponse } from '@/ports/http';
import { AppError } from '@/ports/errors';

export const badRequest = (error: AppError): HttpResponse => ({
  statusCode: 400,
  body: error.toPlain()
});

export const serverError = (): HttpResponse => ({
  statusCode: 500
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
});
