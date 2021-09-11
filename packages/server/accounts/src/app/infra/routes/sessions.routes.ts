import { Router } from 'express';

import { createSessionController } from '@/app/factories/controllers';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
  const res = await createSessionController.handle(request);
  return response.status(res.statusCode).json(res.body);
});

export { sessionsRoutes };
