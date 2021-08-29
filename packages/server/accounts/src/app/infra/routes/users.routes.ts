import { Router } from 'express';

import { makeCreateUser } from '@/app/factories';

const createUser = makeCreateUser();

const usersRoutes = Router();

usersRoutes.post(createUser.route, async (request, response) => {
  const res = await createUser.controller.handle(request);
  return response.status(res.statusCode).json(res.body);
});

export { usersRoutes };
