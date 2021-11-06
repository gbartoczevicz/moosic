import { Router } from 'express';
import multer from 'multer';

import { createUserController, upsertAvatarController } from '@/app/factories/controllers';
import uploadConfig from '@/config/upload';

const upload = multer(uploadConfig.multer);

const usersRoutes = Router();

usersRoutes.post('/', async (request, response) => {
  const res = await createUserController.handle(request);
  return response.status(res.statusCode).json(res.body);
});

usersRoutes.patch('/avatar', upload.single('avatar'), async (request, response) => {
  const res = await upsertAvatarController.handle(request);
  return response.status(res.statusCode).json(res.body);
});

export { usersRoutes };
