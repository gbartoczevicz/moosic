import { Router } from 'express';

import { createUserController } from '@/app/factories/controllers';

const usersRoutes = Router();

usersRoutes.post('/', async (request, response) => {
  const res = await createUserController.handle(request);
  return response.status(res.statusCode).json(res.body);
});

export { usersRoutes };
