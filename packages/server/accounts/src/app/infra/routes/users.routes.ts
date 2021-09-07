import { Router } from 'express';

import { makeCreateUserController } from '@/app/factories';

const createUser = makeCreateUserController();

const usersRoutes = Router();

usersRoutes.post(createUser.route, async (request, response) => {
  const res = await createUser.controller.handle(request);
  return response.status(res.statusCode).json(res.body);
});

export { usersRoutes };
