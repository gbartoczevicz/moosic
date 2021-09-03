import { Controller } from '@/ports/http';

export interface Factory {
  route: string;
  controller: Controller;
}
