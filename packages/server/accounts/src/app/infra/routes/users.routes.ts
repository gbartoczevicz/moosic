import { App } from '@tinyhttp/app';

import { makeCreateUser } from '@/app/factories';

const createUser = makeCreateUser();

const usersRoutes = new App();

usersRoutes.post(createUser.route, async (request, response) => {
  const res = await createUser.controller.handle(request.body);
  return response.status(res.statusCode).json(res.body);
});

export { usersRoutes };
