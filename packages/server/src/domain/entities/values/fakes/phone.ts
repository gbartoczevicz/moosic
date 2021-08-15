import { Phone } from '@/domain/entities/values';

export const makePhone = ({ value = '0000-0000' }) => Phone.create({ value });
