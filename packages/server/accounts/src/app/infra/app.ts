import express from 'express';
import 'express-async-errors';

import { routes } from '@/app/infra/routes';
import { handleServerError } from '@/app/infra/middlewares';
import uploadConfig from '@/config/upload';

const app = express();

app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.uploadsDir));
app.use(handleServerError());

export { app };
