import { Id } from '@/domain/entities/values';

export const makeId = ({ value = 'id' }) => Id.create({ value });
