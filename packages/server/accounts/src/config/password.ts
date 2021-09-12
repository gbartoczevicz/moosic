import { assertAndReturn } from '@/utils';

export default {
  salt: Number(assertAndReturn(process.env.PASSWORD_SALT))
};
