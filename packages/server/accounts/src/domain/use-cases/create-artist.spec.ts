import { left, right } from '@/utils';
import { CreateArtistUseCase, GetUserUseCase } from '@/domain/use-cases';
import { FakeDocumentProvider, FakeIdProvider } from '@/ports/providers/fakes';
import { Artist, User } from '@/domain/entities';
import { DocumentFactory, IdFactory, ArtistFactory } from '@/domain/factories';
import { FakeArtistsRepo, FakeUsersRepo } from '@/ports/database/fakes';
import { CreateArtistDTO } from '@/domain/use-cases/dtos';
import { PropsAreRequired } from '@/domain/entities/errors';
import { DocumentAlreadyInUse, UserNotFound } from '@/domain/use-cases/errors';
import { InfraError } from '@/ports/errors';
import { makeId } from '@/domain/entities/values/fakes';
import { Document, Id } from '@/domain/entities/values';

const makeSut = () => {
  const idFactory = new IdFactory(new FakeIdProvider());

  const artistFactory = new ArtistFactory(
    new IdFactory(new FakeIdProvider()),
    new DocumentFactory(new FakeDocumentProvider())
  );

  const artistsRepo = new FakeArtistsRepo();

  const getUserUseCase = new GetUserUseCase(new FakeUsersRepo(), idFactory);

  return {
    sut: new CreateArtistUseCase(artistFactory, artistsRepo, getUserUseCase),
    artistFactory,
    artistsRepo,
    getUserUseCase
  };
};

const makeFixture = (): CreateArtistDTO => ({
  document: 'document',
  userId: 'user_id'
});

const artistFixture = () => {
  return Artist.create({
    id: makeId({}).value as Id,
    userId: makeId({}).value as Id,
    document: Document.create({ value: 'document' }).value as Document
  }).value as Artist;
};

describe('Create Artist Unitary Test', () => {
  it('should create a valid artist', async () => {
    const { sut, artistFactory, artistsRepo, getUserUseCase } = makeSut();

    jest.spyOn(artistFactory, 'make').mockImplementation(() => right(artistFixture()));
    jest.spyOn(artistsRepo, 'findByDocument').mockImplementation(() => Promise.resolve(right(null)));
    jest.spyOn(getUserUseCase, 'execute').mockImplementation(() => Promise.resolve(right({} as User)));

    const testable = await sut.execute(makeFixture());

    expect(testable.isRight()).toBeTruthy();
  });

  it('should validate artist at factory', async () => {
    const { sut, artistFactory } = makeSut();

    jest.spyOn(artistFactory, 'make').mockImplementation(() => left(new PropsAreRequired()));

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should check if document is already in use', async () => {
    const { sut, artistFactory } = makeSut();

    jest.spyOn(artistFactory, 'make').mockImplementation(() => right({} as Artist));

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(DocumentAlreadyInUse);
  });

  it('should validate if user id does not exists', async () => {
    const { sut, artistFactory, artistsRepo, getUserUseCase } = makeSut();

    jest.spyOn(artistFactory, 'make').mockImplementation(() => right(artistFixture()));
    jest.spyOn(artistsRepo, 'findByDocument').mockImplementation(() => Promise.resolve(right(null)));
    jest.spyOn(getUserUseCase, 'execute').mockImplementation(() => Promise.resolve(left(new UserNotFound())));

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(UserNotFound);
  });

  it('should check artist repo error', async () => {
    const { sut, artistFactory, artistsRepo } = makeSut();

    jest.spyOn(artistFactory, 'make').mockImplementation(() => right({} as Artist));
    jest.spyOn(artistsRepo, 'findByDocument').mockImplementation(() => Promise.resolve(left(new InfraError('any'))));

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(InfraError);
  });
});
