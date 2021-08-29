import { App } from '@tinyhttp/app';

import { routes } from '@/app/infra/routes';

const app = new App();

app.use(routes);

export { app };
