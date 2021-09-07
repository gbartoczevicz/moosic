import { Router } from 'express';

import { usersRoutes } from '@/app/infra/routes/users.routes';
import { restaurateursRoutes } from '@/app/infra/routes/restaurateurs.routes';
import { establishmentsRoutes } from '@/app/infra/routes/establishments.routes';
import { artistsRoutes } from '@/app/infra/routes/artists.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/restaurateurs', restaurateursRoutes);
routes.use('/establishments', establishmentsRoutes);
routes.use('/artists', artistsRoutes);

export { routes };
