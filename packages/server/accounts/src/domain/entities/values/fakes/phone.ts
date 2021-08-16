import { Phone } from '@/domain/entities/values';

export const makePhone = ({ value = '0000-0000', isSanitized = false }) => Phone.create({ value, isSanitized });
