import { EstablishmentFactory, IdFactory, PhoneFactory, MakeEstablishmentProps } from '@/domain/factories';
import { FakeIdProvider, FakePhoneProvider } from '@/ports/providers/fakes';
import { Establishment } from '@/domain/entities';
import { nullAsType } from '@/utils';
import { PropsAreRequired } from '@/domain/entities/errors';
import { left, right } from '@shared/utils';
import { Id } from '@/domain/entities/values';

const makeSut = () => {
  const idFactory = new IdFactory(new FakeIdProvider());
  const phoneFactory = new PhoneFactory(new FakePhoneProvider());

  return {
    sut: new EstablishmentFactory(idFactory, phoneFactory),
    idFactory,
    phoneFactory
  };
};

const makeFixture = (): MakeEstablishmentProps => ({
  id: {},
  name: 'establishment name',
  phone: { value: '0000-0000' },
  restaurateurId: { value: 'restaurateur_id' }
});

describe('Establishment Factory unitary tests', () => {
  it('should create a valid establishment', () => {
    const { sut } = makeSut();

    const fixture = makeFixture();

    const testable = sut.make(fixture);

    expect(testable.isRight()).toBeTruthy();

    const establishment = testable.value as Establishment;

    expect(establishment.id.value).toEqual('generated');
    expect(establishment.name).toEqual(fixture.name);
    expect(establishment.phone.value).toEqual('sanitized');
    expect(establishment.restaurateurId.value).toEqual(fixture.restaurateurId.value);
  });

  it('should validate props itself', () => {
    const { sut } = makeSut();

    const testable = sut.make(nullAsType());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate id', () => {
    const { sut, idFactory } = makeSut();

    jest.spyOn(idFactory, 'make').mockImplementation(() => left(new PropsAreRequired()));

    const testable = sut.make(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate restaurateurId', () => {
    const { sut, idFactory } = makeSut();

    jest
      .spyOn(idFactory, 'make')
      .mockImplementationOnce(() => right({} as Id))
      .mockImplementationOnce(() => left(new PropsAreRequired()));

    const testable = sut.make(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate phone', () => {
    const { sut, phoneFactory } = makeSut();

    jest.spyOn(phoneFactory, 'make').mockImplementation(() => left(new PropsAreRequired()));

    const testable = sut.make(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });
});
