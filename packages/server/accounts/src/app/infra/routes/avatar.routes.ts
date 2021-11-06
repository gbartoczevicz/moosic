import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@/config/upload';
import { upsertAvatarController } from '@/app/factories/controllers';

const upload = multer(uploadConfig.multer);
const avatarRoutes = Router();

avatarRoutes.patch('/', upload.single('avatar'), async (request, response) => {
  const res = await upsertAvatarController.handle(request);
  return response.status(res.statusCode).json(res.body);
});

export { avatarRoutes };
