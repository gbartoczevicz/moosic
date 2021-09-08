import { Router } from 'express';

import { makeCreateSessionController } from '@/app/factories';

const createSession = makeCreateSessionController();

const sessionsRoutes = Router();

sessionsRoutes.post(createSession.route, async (request, response) => {
  const res = await createSession.controller.handle(request);
  return response.status(res.statusCode).json(res.body);
});

export { sessionsRoutes };
