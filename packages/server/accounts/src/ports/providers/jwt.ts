export type JwtSignPayload = {
  userId: string;
};

export type JwtSignOptions = {
  expiresIn: number;
};

export interface JwtProvider {
  sign(payload: JwtSignPayload, secret: string, options: JwtSignOptions): string;
}
