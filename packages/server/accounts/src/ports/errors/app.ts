export type PlainError = {
  message: string;
  fields: string[];
};

export interface AppError extends Error {
  toPlain(): PlainError;
}
