import { ApplicationData } from '@/ports/http';

declare global {
  namespace Express {
    export interface Request {
      applicationData: ApplicationData;
    }
  }
}
