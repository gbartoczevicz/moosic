import axios from 'axios';
import env from '@/config/env';

export const accountsClient = axios.create({
  baseURL: env.ACCOUNTS_API_ENDPOINT
});
