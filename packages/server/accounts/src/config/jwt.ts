import { assertAndReturn } from '@/utils';

export default {
  secret: assertAndReturn(process.env.JWT_SECRET),
  expiresIn: Number(assertAndReturn(process.env.JWT_EXPIRESIN))
};
