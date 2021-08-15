import { Password } from '@/domain/entities/values';

export const makePassword = ({ value = 'secret_value', isHashed = false }) => Password.create({ value, isHashed });
