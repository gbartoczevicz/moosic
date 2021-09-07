import { Artist } from '@/domain/entities';
import { Document, Id } from '@/domain/entities/values';
import { makeId } from '@/domain/entities/values/fakes';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';
import { nullAsType } from '@/utils';

const makeSut = () => ({ sut: Artist });

const makeFixture = () => ({
  id: makeId({}).value as Id,
  document: Document.create({ value: 'any' }).value as Document,
  userId: makeId({}).value as Id
});

describe('Artist Unitary Tests', () => {
  it('should create a valid artist', () => {
    const { sut } = makeSut();

    const testable = sut.create(makeFixture());

    expect(testable.isRight()).toBeTruthy();

    const artist = testable.value as Artist;

    expect(artist.id.value).toEqual('id');
    expect(artist.document.value).toEqual('any');
    expect(artist.userId.value).toEqual('id');

    expect(artist.toPlain()).toEqual({
      id: 'id',
      document: 'any',
      userId: 'id'
    });
  });

  it('should validate props itself', () => {
    const { sut } = makeSut();

    const testable = sut.create(nullAsType());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate id', () => {
    const { sut } = makeSut();

    const testable = sut.create({
      ...makeFixture(),
      id: nullAsType()
    });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toEqual(new FieldIsRequired('id'));
  });

  it('should validate document', () => {
    const { sut } = makeSut();

    const testable = sut.create({
      ...makeFixture(),
      document: nullAsType()
    });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toEqual(new FieldIsRequired('document'));
  });

  it('should validate userId', () => {
    const { sut } = makeSut();

    const testable = sut.create({
      ...makeFixture(),
      userId: nullAsType()
    });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toEqual(new FieldIsRequired('userId'));
  });
});
