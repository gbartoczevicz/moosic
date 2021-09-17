import { Router } from 'express';

import { createEstablishmentController, upsertLocationController } from '@/app/factories/controllers';

const establishmentsRoutes = Router();

establishmentsRoutes.post('/', async (request, response) => {
  const res = await createEstablishmentController.handle(request);
  return response.status(res.statusCode).json(res.body);
});

establishmentsRoutes.post('/location', async (request, response) => {
  const res = await upsertLocationController.handle(request);
  return response.status(res.statusCode).json(res.body);
});

export { establishmentsRoutes };
