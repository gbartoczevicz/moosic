import { User } from '@/domain/entities/user';
import { Email, Password, Phone } from '@/domain/entities/values';

type Props = {
  name?: string | 'username';
  email: Email;
  password: Password;
  phone: Phone;
};

export const makeUser = (props: Props) => User.create({ ...props, name: String(props.name) });
