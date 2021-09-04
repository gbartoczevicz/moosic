import { right } from '@shared/utils';
import { Restaurateur } from '@/domain/entities';
import { RestaurateurRepo, SaveRestaurateur, FindUniqueRestaurateur } from '@/ports/database';
import { Document, Id } from '@/domain/entities/values';
import { makeId } from '@/domain/entities/values/fakes';

export class FakeRestaurateurRepo implements RestaurateurRepo {
  public async save(restaurateur: Restaurateur): Promise<SaveRestaurateur> {
    return Promise.resolve(right(restaurateur));
  }

  public async findByDocument(document: Document): Promise<FindUniqueRestaurateur> {
    const restaurateur = Restaurateur.create({
      id: makeId({ value: 'restaurateur_id' }).value as Id,
      userId: makeId({ value: 'user_id' }).value as Id,
      document
    }).value as Restaurateur;

    return Promise.resolve(right(restaurateur));
  }
}
