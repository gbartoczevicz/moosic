import { Router } from 'express';

import { createArtistController } from '@/app/factories/controllers';

const artistsRoutes = Router();

artistsRoutes.post('/', async (request, response) => {
  const res = await createArtistController.handle(request);
  return response.status(res.statusCode).json(res.body);
});

export { artistsRoutes };
