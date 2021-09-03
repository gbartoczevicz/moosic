import { HttpRequest, HttpResponse } from '@/ports/http';

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}
