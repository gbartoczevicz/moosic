import { User } from '@/domain/entities/user';
import { router } from '@/routes';

const factory = () => router(`Class Name: ${User.prototype.constructor}`);

factory();
