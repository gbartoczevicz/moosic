import { UpsertLocationUseCase } from '@/domain/use-cases';
import { UpsertLocationController } from '@/domain/controllers';
import { LocationFactory } from '@/domain/factories';
import { Location } from '@/domain/entities';
import { Id } from '@/domain/entities/values';
import { left, right } from '@/utils';
import { badRequest, ok, serverError } from '@/ports/http/helpers';
import { InfraError } from '@/ports/errors';
import { UserNotFound } from '@/domain/use-cases/errors';
import { EstablishmentsRepo, LocationsRepo } from '@/ports/database';

const makeSut = () => {
  const upsertLocationUseCase = new UpsertLocationUseCase(
    {} as LocationsRepo,
    {} as EstablishmentsRepo,
    {} as LocationFactory
  );

  return {
    sut: new UpsertLocationController(upsertLocationUseCase),
    upsertLocationUseCase
  };
};

const makeFixture = () => ({
  body: {
    establishmentId: 'string',
    address: 'string',
    num: 83,
    postalCode: 'string',
    latitude: 83,
    longitude: 83
  },
  applicationData: {
    userId: 'any user id'
  }
});

const locationFixture = () => {
  const { body } = makeFixture();

  return Location.create({
    ...body,
    establishmentId: Id.create({ value: body.establishmentId }).value as Id
  }).value as Location;
};

describe('UpsertLocationController Unitary Tests', () => {
  it('should create an location', async () => {
    const { sut, upsertLocationUseCase } = makeSut();

    jest.spyOn(upsertLocationUseCase, 'execute').mockImplementation(() => Promise.resolve(right(locationFixture())));

    const fixture = makeFixture();

    const testable = await sut.handle(fixture);

    expect(testable.statusCode).toEqual(ok({}).statusCode);
    expect(testable.body).toStrictEqual(fixture.body);
  });

  it('should validate business exception', async () => {
    const { sut, upsertLocationUseCase } = makeSut();

    jest.spyOn(upsertLocationUseCase, 'execute').mockImplementation(() => Promise.resolve(left(new UserNotFound())));

    const testable = await sut.handle(makeFixture());

    const response = badRequest(new UserNotFound());

    expect(testable.statusCode).toEqual(response.statusCode);
    expect(testable.body).toEqual(response.body);
  });

  it('should validate an infra error', async () => {
    const { sut, upsertLocationUseCase } = makeSut();

    jest.spyOn(upsertLocationUseCase, 'execute').mockImplementation(() => Promise.resolve(left(new InfraError('any'))));

    const testable = await sut.handle(makeFixture());

    expect(testable.statusCode).toEqual(serverError().statusCode);
  });
});
