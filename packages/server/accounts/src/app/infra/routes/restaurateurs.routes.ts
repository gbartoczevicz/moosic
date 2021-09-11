import { Router } from 'express';

import { createRestaurateurControlle } from '@/app/factories/controllers';

const restaurateursRoutes = Router();

restaurateursRoutes.post('/', async (request, response) => {
  const res = await createRestaurateurControlle.handle(request);
  return response.status(res.statusCode).json(res.body);
});

export { restaurateursRoutes };
