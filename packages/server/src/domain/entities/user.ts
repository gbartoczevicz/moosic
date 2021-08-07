export type UserProps = {
  email: string;
};

export class User {
  public readonly email: string;

  private constructor(email: string) {
    this.email = email;
  }

  public static create(props: UserProps): User | Error {
    if (!props) {
      return new Error('Props is required');
    }

    const { email } = props;

    if (!email) {
      return new Error('Email is required');
    }

    return new User(email);
  }
}
