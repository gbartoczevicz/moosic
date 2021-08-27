export class ServerError extends Error {
  public constructor() {
    super("Something went wrong but don't worry! It's not your fault :)");
  }
}
