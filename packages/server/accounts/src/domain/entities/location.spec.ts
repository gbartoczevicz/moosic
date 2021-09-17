import { Location, LocationProps } from '@/domain/entities';
import { nullAsType } from '@/utils';
import { makeId } from '@/domain/entities/values/fakes';
import { Id } from '@/domain/entities/values';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';

const makeSut = () => ({ sut: Location });

const makeFixture = (): LocationProps => ({
  address: 'any address',
  latitude: 123,
  longitude: 123,
  num: 30,
  postalCode: 'any',
  establishmentId: makeId({ value: 'establishment_id' }).value as Id
});

describe('Location Unitary Tests', () => {
  it('should create a valid location object', () => {
    const { sut } = makeSut();

    const fixture = makeFixture();

    const testable = sut.create(fixture);

    expect(testable.isRight()).toBeTruthy();

    const location = testable.value as Location;

    expect(location.address).toEqual(fixture.address);
    expect(location.latitude).toEqual(fixture.latitude);
    expect(location.longitude).toEqual(fixture.longitude);
    expect(location.num).toEqual(fixture.num);
    expect(location.postalCode).toEqual(fixture.postalCode);
    expect(location.establishmentId.value).toEqual(fixture.establishmentId.value);

    expect(location.toPlain()).toStrictEqual({ ...fixture, establishmentId: fixture.establishmentId.value });
  });

  it('should validate props', () => {
    const { sut } = makeSut();

    const testable = sut.create(nullAsType());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toEqual(new PropsAreRequired());
  });

  it('should validate establishmentId param', () => {
    const { sut } = makeSut();

    const testable = sut.create({
      ...makeFixture(),
      establishmentId: nullAsType()
    });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toEqual(new FieldIsRequired('establishmentId'));
  });

  it('should validate address param', () => {
    const { sut } = makeSut();

    const testable = sut.create({
      ...makeFixture(),
      address: nullAsType()
    });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toEqual(new FieldIsRequired('address'));
  });

  it('should validate address number param', () => {
    const { sut } = makeSut();

    const testable = sut.create({
      ...makeFixture(),
      num: nullAsType()
    });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toEqual(new FieldIsRequired('num'));
  });

  it('should validate postalCode param', () => {
    const { sut } = makeSut();

    const testable = sut.create({
      ...makeFixture(),
      postalCode: nullAsType()
    });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toEqual(new FieldIsRequired('postalCode'));
  });

  it('should validate latitude param', () => {
    const { sut } = makeSut();

    const testable = sut.create({
      ...makeFixture(),
      latitude: nullAsType()
    });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toEqual(new FieldIsRequired('latitude'));
  });

  it('should validate longitude param', () => {
    const { sut } = makeSut();

    const testable = sut.create({
      ...makeFixture(),
      longitude: nullAsType()
    });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toEqual(new FieldIsRequired('longitude'));
  });
});
