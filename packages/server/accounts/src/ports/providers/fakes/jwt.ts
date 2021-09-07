import { JwtProvider, JwtSignOptions, JwtSignPayload } from '@/ports/providers';

export class FakeJwtProvider implements JwtProvider {
  public sign(payload: JwtSignPayload, secret: string, options: JwtSignOptions): string {
    return 'generated_jwt';
  }
}
