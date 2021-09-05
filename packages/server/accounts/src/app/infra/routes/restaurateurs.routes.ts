import { Router } from 'express';

import { makeCreateRestaurateur } from '@/app/factories';

const createRestaurateur = makeCreateRestaurateur();

const restaurateursRoutes = Router();

restaurateursRoutes.post(createRestaurateur.route, async (request, response) => {
  const res = await createRestaurateur.controller.handle(request);
  return response.status(res.statusCode).json(res.body);
});

export { restaurateursRoutes };
