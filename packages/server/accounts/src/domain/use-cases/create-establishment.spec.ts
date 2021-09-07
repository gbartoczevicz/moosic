import { CreateEstablishmentUseCase, GetRestaurateurUseCase } from '@/domain/use-cases';
import { EstablishmentFactory, IdFactory, PhoneFactory } from '@/domain/factories';
import { FakeRestaurateurEstablishmentsRepo, FakeRestaurateurRepo } from '@/ports/database/fakes';
import { FakeIdProvider, FakePhoneProvider } from '@/ports/providers/fakes';
import { CreateEstablishmentDTO } from '@/domain/use-cases/dtos';
import { left, right } from '@/utils';
import { Establishment } from '@/domain/entities';
import { PropsAreRequired } from '@/domain/entities/errors';
import { PhoneAlreadyInUse, RestaurateurNotFound } from '@/domain/use-cases/errors';
import { InfraError } from '@/ports/errors';
import { makeId, makePhone } from '../entities/values/fakes';
import { Id, Phone } from '../entities/values';

const makeSut = () => {
  const idFactory = new IdFactory(new FakeIdProvider());

  const establishmentFactory = new EstablishmentFactory(idFactory, new PhoneFactory(new FakePhoneProvider()));
  const establishmentRepo = new FakeRestaurateurEstablishmentsRepo();
  const getRestaurateurUseCase = new GetRestaurateurUseCase(new FakeRestaurateurRepo(), idFactory);

  return {
    sut: new CreateEstablishmentUseCase(establishmentFactory, establishmentRepo, getRestaurateurUseCase),
    establishmentFactory,
    establishmentRepo,
    getRestaurateurUseCase
  };
};

const makeFixture = (): CreateEstablishmentDTO => ({
  name: 'Establishment Name',
  phone: '00000000',
  restaurateurId: 'restaurateur_id'
});

describe('CreateEstablishmentUseCase Unitary Tests', () => {
  it('should create establishment', async () => {
    const { sut, establishmentRepo } = makeSut();

    jest.spyOn(establishmentRepo, 'findByPhone').mockImplementation(() => Promise.resolve(right(null)));

    const fixture = makeFixture();

    const testable = await sut.execute(fixture);

    expect(testable.isRight()).toBeTruthy();

    const establishment = testable.value as Establishment;

    expect(establishment.id.value).toEqual('generated');
    expect(establishment.name).toEqual(fixture.name);
    expect(establishment.phone.value).toEqual('sanitized');
    expect(establishment.restaurateurId.value).toEqual(fixture.restaurateurId);
  });

  it('should validate establishment factory', async () => {
    const { sut, establishmentFactory } = makeSut();

    jest.spyOn(establishmentFactory, 'make').mockImplementation(() => left(new PropsAreRequired()));

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate establishment factory on second call', async () => {
    const { sut, establishmentFactory, establishmentRepo } = makeSut();

    jest.spyOn(establishmentRepo, 'findByPhone').mockImplementation(() => Promise.resolve(right(null)));

    jest
      .spyOn(establishmentFactory, 'make')
      .mockImplementationOnce(() => {
        const establishment = Establishment.create({
          id: makeId({}).value as Id,
          name: 'any',
          phone: makePhone({}).value as Phone,
          restaurateurId: makeId({}).value as Id
        });

        return right(establishment.value as Establishment);
      })
      .mockImplementationOnce(() => left(new PropsAreRequired()));

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate if phone is already in use', async () => {
    const { sut } = makeSut();

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PhoneAlreadyInUse);
  });

  it('should validate infra error', async () => {
    const { sut, establishmentRepo } = makeSut();

    jest.spyOn(establishmentRepo, 'findByPhone').mockImplementation(() => Promise.resolve(left(new InfraError('any'))));

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(InfraError);
  });

  it('should validate if restaurateur exists', async () => {
    const { sut, establishmentRepo, getRestaurateurUseCase } = makeSut();

    jest.spyOn(establishmentRepo, 'findByPhone').mockImplementation(() => Promise.resolve(right(null)));
    jest
      .spyOn(getRestaurateurUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(left(new RestaurateurNotFound())));

    const testable = await sut.execute(makeFixture());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(RestaurateurNotFound);
  });
});
