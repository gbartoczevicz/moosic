import { Email } from '@/domain/entities/values';

export const makeEmail = ({ value = 'user_email@email.com' }) => Email.create({ value });
