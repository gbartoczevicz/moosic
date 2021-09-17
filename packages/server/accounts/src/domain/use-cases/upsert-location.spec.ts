import { UpsertLocationUseCase } from '@/domain/use-cases';
import { FakeLocationsRepo, FakeRestaurateurEstablishmentsRepo } from '@/ports/database/fakes';
import { FakeIdProvider } from '@/ports/providers/fakes';
import { IdFactory, LocationFactory } from '@/domain/factories';
import { UpsertLocationDTO } from '@/domain/use-cases/dtos';
import { Location } from '@/domain/entities';
import { left, right } from '@/utils';
import { InfraError } from '@/ports/errors';
import { PropsAreRequired } from '../entities/errors';
import { EstablishmentNotFound, LocationAlreadyInUse, PostalCodeAlreadyInUse } from './errors';

const makeSut = () => {
  const locationsRepo = new FakeLocationsRepo();
  const establishmentRepo = new FakeRestaurateurEstablishmentsRepo();
  const locationFactory = new LocationFactory(new IdFactory(new FakeIdProvider()));

  return {
    sut: new UpsertLocationUseCase(locationsRepo, establishmentRepo, locationFactory),
    locationsRepo,
    establishmentRepo,
    locationFactory
  };
};

const makeFixture = (): UpsertLocationDTO => ({
  establishmentId: 'establishment_id',
  address: 'address',
  latitude: 10,
  longitude: 10,
  num: 10,
  postalCode: '00000'
});

describe('UpsertLocationUseCase Unitary Tests', () => {
  it('should create location', async () => {
    const { sut, locationsRepo } = makeSut();

    const fixture = makeFixture();

    jest.spyOn(locationsRepo, 'findByLatitudeAndLongitude').mockImplementation(() => Promise.resolve(right(null)));
    jest.spyOn(locationsRepo, 'findByPostalCode').mockImplementation(() => Promise.resolve(right(null)));

    const testable = await sut.execute(fixture);

    expect(testable.isRight()).toBeTruthy();

    const location = testable.value as Location;

    expect(location.establishmentId.value).toEqual(fixture.establishmentId);
    expect(location.address).toEqual(fixture.address);
    expect(location.latitude).toEqual(fixture.latitude);
    expect(location.longitude).toEqual(fixture.longitude);
    expect(location.num).toEqual(fixture.num);
    expect(location.postalCode).toEqual(fixture.postalCode);
  });

  it('should validate location factory', async () => {
    const { sut, locationFactory } = makeSut();

    jest.spyOn(locationFactory, 'make').mockImplementation(() => left(new PropsAreRequired()));

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate if establishment exists', async () => {
    const { sut, establishmentRepo } = makeSut();

    jest.spyOn(establishmentRepo, 'findById').mockImplementation(() => Promise.resolve(right(null)));

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(EstablishmentNotFound);
  });

  it('should validate if coordinate is already in use', async () => {
    const { sut } = makeSut();

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(LocationAlreadyInUse);
  });

  it('should validate if coordinate is already in use', async () => {
    const { sut, locationsRepo } = makeSut();

    jest.spyOn(locationsRepo, 'findByLatitudeAndLongitude').mockImplementation(() => Promise.resolve(right(null)));

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PostalCodeAlreadyInUse);
  });

  describe('Infra Error validation', () => {
    describe('establishmentRepo', () => {
      it('findById', async () => {
        const { sut, establishmentRepo } = makeSut();

        jest
          .spyOn(establishmentRepo, 'findById')
          .mockImplementation(() => Promise.resolve(left(new InfraError('any'))));

        const testable = await sut.execute(makeFixture());

        expect(testable.isLeft()).toBeTruthy();
        expect(testable.value).toBeInstanceOf(InfraError);
      });
    });

    describe('locationsRepo', () => {
      it('findByLatitudeAndLongitude', async () => {
        const { sut, locationsRepo } = makeSut();

        jest
          .spyOn(locationsRepo, 'findByLatitudeAndLongitude')
          .mockImplementation(() => Promise.resolve(left(new InfraError('any'))));

        const testable = await sut.execute(makeFixture());

        expect(testable.isLeft()).toBeTruthy();
        expect(testable.value).toBeInstanceOf(InfraError);
      });

      it('findByPostalCode', async () => {
        const { sut, locationsRepo } = makeSut();

        jest.spyOn(locationsRepo, 'findByLatitudeAndLongitude').mockImplementation(() => Promise.resolve(right(null)));
        jest
          .spyOn(locationsRepo, 'findByPostalCode')
          .mockImplementation(() => Promise.resolve(left(new InfraError('any'))));

        const testable = await sut.execute(makeFixture());

        expect(testable.isLeft()).toBeTruthy();
        expect(testable.value).toBeInstanceOf(InfraError);
      });
    });
  });
});
