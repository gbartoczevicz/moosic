export type Either<L, R> = Left<L, R> | Right<L, R>;

export class Left<L, R> {
  public readonly value: L;

  public constructor(value: L) {
    this.value = value;
  }

  public isLeft = (): this is Left<L, R> => true;

  public isRight = (): this is Right<L, R> => false;
}

export class Right<L, R> {
  public readonly value: R;

  public constructor(value: R) {
    this.value = value;
  }

  public isLeft = (): this is Left<L, R> => false;

  public isRight = (): this is Right<L, R> => true;
}

export const left = <L, R>(l: L): Either<L, R> => new Left<L, R>(l);

export const right = <L, R>(a: R): Either<L, R> => new Right<L, R>(a);
