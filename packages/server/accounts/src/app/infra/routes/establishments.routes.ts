import { Router } from 'express';

import { makeCreateEstablishmentController } from '@/app/factories';

const createEstablishment = makeCreateEstablishmentController();

const establishmentsRoutes = Router();

establishmentsRoutes.post(createEstablishment.route, async (request, response) => {
  const res = await createEstablishment.controller.handle(request);
  return response.status(res.statusCode).json(res.body);
});

export { establishmentsRoutes };
