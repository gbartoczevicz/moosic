import { Router } from 'express';

import { makeCreateArtistController } from '@/app/factories';

const createArtist = makeCreateArtistController();

const artistsRoutes = Router();

artistsRoutes.post(createArtist.route, async (request, response) => {
  const res = await createArtist.controller.handle(request);
  return response.status(res.statusCode).json(res.body);
});

export { artistsRoutes };
