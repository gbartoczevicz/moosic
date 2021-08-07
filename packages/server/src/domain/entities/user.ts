import { Email } from './values';

type UserProps = {
  email: string;
};

export class User {
  public readonly email: Email;

  private constructor(email: Email) {
    this.email = email;
  }

  public static create(props: UserProps): User | Error {
    if (!props) {
      return new Error('Props is required');
    }

    const email = Email.create({ value: props.email });

    if (email instanceof Error) {
      return email;
    }

    return new User(email);
  }
}
