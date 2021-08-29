import express from 'express';

import { routes } from '@/app/infra/routes';

const app = express();

app.use(express.json());
app.use(routes);

export { app };
