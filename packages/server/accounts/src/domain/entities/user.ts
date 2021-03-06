import { Either, left, right } from '@/utils';

import { Email, Id, Password, Phone } from '@/domain/entities/values';
import { PropsAreRequired, FieldIsRequired } from '@/domain/entities/errors';

type UserProps = {
  id: Id;
  name: string;
  email: Email;
  password: Password;
  phone: Phone;
  avatar?: string;
};

export class User {
  public readonly id: Id;

  public readonly name: string;

  public readonly email: Email;

  public readonly password: Password;

  public readonly phone: Phone;

  public readonly avatar?: string;

  private constructor(id: Id, name: string, email: Email, password: Password, phone: Phone, avatar?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.avatar = avatar;
  }

  public static create(props: UserProps): Either<FieldIsRequired | PropsAreRequired, User> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { id, name, email, password, phone, avatar } = props;

    if (!id) {
      return left(new FieldIsRequired('id'));
    }

    if (!name) {
      return left(new FieldIsRequired('name'));
    }

    if (!email) {
      return left(new FieldIsRequired('email'));
    }

    if (!password) {
      return left(new FieldIsRequired('password'));
    }

    if (!phone) {
      return left(new FieldIsRequired('phone'));
    }

    const user = new User(id, name, email, password, phone, avatar);

    return right(user);
  }

  public toPlain() {
    return {
      id: this.id.value,
      name: this.name,
      email: this.email.value,
      phone: this.phone.value,
      avatar: this.avatar
    };
  }
}
