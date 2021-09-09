import { CreateArtistUseCase, GetUserUseCase } from '@/domain/use-cases';
import { CreateArtistController } from '@/domain/controllers';
import { ArtistFactory } from '@/domain/factories';
import { FakeArtistsRepo } from '@/ports/database/fakes';
import { Artist } from '@/domain/entities';
import { makeId } from '@/domain/entities/values/fakes';
import { Document, Id } from '@/domain/entities/values';
import { left, right } from '@/utils';
import { badRequest, ok, serverError } from '@/ports/http/helpers';
import { InfraError } from '@/ports/errors';
import { UserNotFound } from '@/domain/use-cases/errors';

const makeSut = () => {
  const createArtistUseCase = new CreateArtistUseCase({} as ArtistFactory, {} as FakeArtistsRepo, {} as GetUserUseCase);

  return {
    sut: new CreateArtistController(createArtistUseCase),
    createArtistUseCase
  };
};

const makeFixture = () => ({
  body: {
    document: 'any document'
  },
  applicationData: {
    userId: 'any user id'
  }
});

const artistFixture = () => {
  const { body, applicationData } = makeFixture();

  return Artist.create({
    id: makeId({}).value as Id,
    userId: makeId({ value: applicationData.userId }).value as Id,
    document: Document.create({ value: body.document }).value as Document
  }).value as Artist;
};

describe('CreateArtistController Unitary Tests', () => {
  it('should create an artist', async () => {
    const { sut, createArtistUseCase } = makeSut();

    jest.spyOn(createArtistUseCase, 'execute').mockImplementation(() => Promise.resolve(right(artistFixture())));

    const fixture = makeFixture();

    const testable = await sut.handle(fixture);

    expect(testable.statusCode).toEqual(ok({}).statusCode);
    expect(testable.body).toEqual({
      ...fixture.body,
      ...fixture.applicationData,
      id: 'id'
    });
  });

  it('should validate business exception', async () => {
    const { sut, createArtistUseCase } = makeSut();

    jest.spyOn(createArtistUseCase, 'execute').mockImplementation(() => Promise.resolve(left(new UserNotFound())));

    const testable = await sut.handle(makeFixture());

    const response = badRequest(new UserNotFound());

    expect(testable.statusCode).toEqual(response.statusCode);
    expect(testable.body).toEqual(response.body);
  });

  it('should validate an infra error', async () => {
    const { sut, createArtistUseCase } = makeSut();

    jest.spyOn(createArtistUseCase, 'execute').mockImplementation(() => Promise.resolve(left(new InfraError('any'))));

    const testable = await sut.handle(makeFixture());

    expect(testable.statusCode).toEqual(serverError().statusCode);
  });
});
