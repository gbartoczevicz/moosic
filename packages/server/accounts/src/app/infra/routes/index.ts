import { Router } from 'express';

import { usersRoutes } from '@/app/infra/routes/users.routes';
import { sessionsRoutes } from '@/app/infra/routes/sessions.routes';
import { restaurateursRoutes } from '@/app/infra/routes/restaurateurs.routes';
import { establishmentsRoutes } from '@/app/infra/routes/establishments.routes';
import { artistsRoutes } from '@/app/infra/routes/artists.routes';
import { ensureAuthenticated, restaurateurAuthenticated } from '@/app/infra/middlewares';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

routes.use(ensureAuthenticated());

routes.use('/restaurateurs', restaurateursRoutes);
routes.use('/establishments', restaurateurAuthenticated(), establishmentsRoutes);
routes.use('/artists', artistsRoutes);

export { routes };
