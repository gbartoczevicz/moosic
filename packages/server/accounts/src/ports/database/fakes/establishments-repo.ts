import { right } from '@/utils';
import { Establishment } from '@/domain/entities';
import { Id, Phone } from '@/domain/entities/values';
import { EstablishmentsRepo, FindUniqueEstablishment, SaveEstablishment } from '@/ports/database';
import { makeId } from '@/domain/entities/values/fakes';

export class FakeRestaurateurEstablishmentsRepo implements EstablishmentsRepo {
  public async save(establishment: Establishment): Promise<SaveEstablishment> {
    return Promise.resolve(right(establishment));
  }

  public async findByPhone(phone: Phone): Promise<FindUniqueEstablishment> {
    const establishment = Establishment.create({
      id: makeId({ value: 'establishment_id' }).value as Id,
      name: 'establishment name',
      phone,
      restaurateurId: makeId({ value: 'restaurateur_id' }).value as Id
    }).value as Establishment;

    return Promise.resolve(right(establishment));
  }
}
