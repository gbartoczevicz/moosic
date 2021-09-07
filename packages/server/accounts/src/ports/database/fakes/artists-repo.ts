import { right } from '@/utils';
import { Artist } from '@/domain/entities';
import { ArtistsRepo, SaveArtist, FindUniqueArtist } from '@/ports/database';
import { Document, Id } from '@/domain/entities/values';
import { makeId } from '@/domain/entities/values/fakes';

export class FakeArtistsRepo implements ArtistsRepo {
  public async save(artist: Artist): Promise<SaveArtist> {
    return Promise.resolve(right(artist));
  }

  public async findByUserId(userId: Id): Promise<FindUniqueArtist> {
    const artist = Artist.create({
      id: makeId({ value: 'artist_id' }).value as Id,
      userId,
      document: Document.create({ value: 'document' }).value as Document
    }).value as Artist;

    return Promise.resolve(right(artist));
  }

  public async findByDocument(document: Document): Promise<FindUniqueArtist> {
    const artist = Artist.create({
      id: makeId({ value: 'artist_id' }).value as Id,
      userId: makeId({ value: 'user_id' }).value as Id,
      document
    }).value as Artist;

    return Promise.resolve(right(artist));
  }
}
