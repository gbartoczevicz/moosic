import { Artist } from '@/domain/entities';
import { ArtistFactory, IdFactory, DocumentFactory, MakeArtistProps } from '@/domain/factories';
import { FakeDocumentProvider, FakeIdProvider } from '@/ports/providers/fakes';
import { nullAsType } from '@/utils';
import { PropsAreRequired } from '@/domain/entities/errors';

const makeSut = () => {
  const idFactory = new IdFactory(new FakeIdProvider());
  const documentFactory = new DocumentFactory(new FakeDocumentProvider());

  return {
    sut: new ArtistFactory(idFactory, documentFactory),
    idFactory,
    documentFactory
  };
};

const makeFixture = (): MakeArtistProps => ({
  id: {},
  userId: { value: 'user_id' },
  document: { value: 'document', toSanitize: true, type: 'CPF' }
});

describe('Artist Factory Unitary Tests', () => {
  it('should create a valid artist', () => {
    const { sut } = makeSut();

    const fixture = makeFixture();

    const testable = sut.make(fixture);

    expect(testable.isRight()).toBeTruthy();

    const artist = testable.value as Artist;

    expect(artist.id.value).toEqual('generated');
    expect(artist.userId.value).toEqual('user_id');
    expect(artist.document.value).toEqual('sanitized');
  });

  it('should validate props itself', () => {
    const { sut } = makeSut();

    const testable = sut.make(nullAsType());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate id', () => {
    const { sut } = makeSut();

    const testable = sut.make({
      ...makeFixture(),
      id: nullAsType()
    });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate userId', () => {
    const { sut } = makeSut();

    const testable = sut.make({
      ...makeFixture(),
      userId: nullAsType()
    });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate document', () => {
    const { sut } = makeSut();

    const testable = sut.make({
      ...makeFixture(),
      document: nullAsType()
    });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });
});
