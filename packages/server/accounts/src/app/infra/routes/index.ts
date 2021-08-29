import { Router } from 'express';

import { usersRoutes } from '@/app/infra/routes/users.routes';

const routes = Router();

routes.use('/users', usersRoutes);

export { routes };
