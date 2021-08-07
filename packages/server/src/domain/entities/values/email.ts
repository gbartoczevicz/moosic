type EmailProps = {
  value: string;
};

export class Email {
  public readonly value: string;

  private static readonly regex =
    // eslint-disable-next-line no-useless-escape
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(props: EmailProps): Email | Error {
    if (!props) {
      return new Error('Props is required');
    }

    const { value } = props;

    if (!value) {
      return new Error('Address is required');
    }

    if (!this.isValid(value)) {
      return new Error('Address is invalid');
    }

    return new Email(value);
  }

  private static isValid(value: string): boolean {
    return this.regex.test(value);
  }
}
