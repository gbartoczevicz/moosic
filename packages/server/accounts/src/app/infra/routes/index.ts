import { Router } from 'express';

import { usersRoutes } from '@/app/infra/routes/users.routes';
import { restaurateursRoutes } from '@/app/infra/routes/restaurateurs.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/restaurateurs', restaurateursRoutes);

export { routes };
