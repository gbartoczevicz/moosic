import { User } from '@/domain/entities/user';
import { Email, Id, Password, Phone } from '@/domain/entities/values';

type Props = {
  id: Id;
  name?: string | 'username';
  email: Email;
  password: Password;
  phone: Phone;
};

export const makeUser = (props: Props) => User.create({ ...props, name: String(props.name) });
