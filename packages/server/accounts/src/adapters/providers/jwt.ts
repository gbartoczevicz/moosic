import * as Provider from 'jsonwebtoken';
import { JwtProvider, JwtSignOptions, JwtSignPayload } from '@/ports/providers';

export class JwtProviderImpl implements JwtProvider {
  public sign(payload: JwtSignPayload, secret: string, options: JwtSignOptions): string {
    return Provider.sign(payload, secret, options);
  }
}
