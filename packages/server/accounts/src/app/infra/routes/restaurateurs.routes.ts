import { Router } from 'express';

import { makeCreateRestaurateurController } from '@/app/factories';

const createRestaurateur = makeCreateRestaurateurController();

const restaurateursRoutes = Router();

restaurateursRoutes.post(createRestaurateur.route, async (request, response) => {
  const res = await createRestaurateur.controller.handle(request);
  return response.status(res.statusCode).json(res.body);
});

export { restaurateursRoutes };
