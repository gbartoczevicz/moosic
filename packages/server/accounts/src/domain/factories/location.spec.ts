import { LocationFactory, IdFactory, MakeLocationProps } from '@/domain/factories';
import { FakeIdProvider } from '@/ports/providers/fakes';
import { left, nullAsType } from '@/utils';
import { PropsAreRequired } from '@/domain/entities/errors';
import { Location } from '@/domain/entities';

const makeSut = () => {
  const idFactory = new IdFactory(new FakeIdProvider());

  return {
    sut: new LocationFactory(idFactory),
    idFactory
  };
};

const makeFixture = (): MakeLocationProps => ({
  establishmentId: { value: 'establishment id' },
  address: 'any',
  latitude: 123,
  longitude: 123,
  num: 12,
  postalCode: 'any'
});

describe('LocationFactory Unitary Tests', () => {
  it('should create a valid location', () => {
    const { sut } = makeSut();

    const fixture = makeFixture();

    const testable = sut.make(fixture);

    expect(testable.isRight()).toBeTruthy();

    const location = testable.value as Location;

    expect(location.establishmentId.value).toEqual(fixture.establishmentId.value);
    expect(location.address).toEqual(fixture.address);
    expect(location.latitude).toEqual(fixture.latitude);
    expect(location.longitude).toEqual(fixture.longitude);
    expect(location.num).toEqual(fixture.num);
    expect(location.postalCode).toEqual(fixture.postalCode);
  });

  it('should validate props', () => {
    const testable = makeSut().sut.make(nullAsType());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate result from id factory', () => {
    const { sut, idFactory } = makeSut();

    jest.spyOn(idFactory, 'make').mockImplementation(() => left(new PropsAreRequired()));

    const testable = sut.make(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });
});
