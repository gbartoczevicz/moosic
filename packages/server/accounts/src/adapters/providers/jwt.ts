import * as Provider from 'jsonwebtoken';
import { JwtProvider, JwtSignOptions, JwtSignPayload } from '@/ports/providers';

export class JwtProviderImpl implements JwtProvider {
  public sign(payload: JwtSignPayload, secret: string, options: JwtSignOptions): string {
    return Provider.sign(payload, secret, options);
  }

  /** @todo check if is working */
  public verify(token: string, secret: string): string {
    const sub = Provider.verify(token, secret) as any;

    if (!sub) {
      throw new Error('Sub value not found');
    }

    const { userId } = sub;

    if (!userId) {
      throw new Error('Sub value is invalid');
    }

    return String(userId);
  }
}
