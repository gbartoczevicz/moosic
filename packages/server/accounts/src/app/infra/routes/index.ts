import { App } from '@tinyhttp/app';

import { usersRoutes } from '@/app/infra/routes/users.routes';

const routes = new App();

routes.use('/users', usersRoutes);

export { routes };
