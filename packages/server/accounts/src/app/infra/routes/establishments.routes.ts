import { Router } from 'express';

import { createEstablishmentController } from '@/app/factories/controllers';

const establishmentsRoutes = Router();

establishmentsRoutes.post('/', async (request, response) => {
  const res = await createEstablishmentController.handle(request);
  return response.status(res.statusCode).json(res.body);
});

export { establishmentsRoutes };
