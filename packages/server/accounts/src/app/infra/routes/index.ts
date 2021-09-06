import { Router } from 'express';

import { usersRoutes } from '@/app/infra/routes/users.routes';
import { restaurateursRoutes } from '@/app/infra/routes/restaurateurs.routes';
import { establishmentsRoutes } from '@/app/infra/routes/establishments.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/restaurateurs', restaurateursRoutes);
routes.use('/establishments', establishmentsRoutes);

export { routes };
