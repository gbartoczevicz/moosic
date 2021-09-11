import { CreateEstablishmentUseCase } from '@/domain/use-cases';
import { CreateEstablishmentController } from '@/domain/controllers';
import { EstablishmentFactory } from '@/domain/factories';
import { FakeRestaurateurEstablishmentsRepo } from '@/ports/database/fakes';
import { Establishment } from '@/domain/entities';
import { makeId, makePhone } from '@/domain/entities/values/fakes';
import { Id, Phone } from '@/domain/entities/values';
import { left, right } from '@/utils';
import { badRequest, ok, serverError } from '@/ports/http/helpers';
import { InfraError } from '@/ports/errors';
import { UserNotFound } from '../use-cases/errors';

const makeSut = () => {
  const createEstablishmentUseCase = new CreateEstablishmentUseCase(
    {} as EstablishmentFactory,
    {} as FakeRestaurateurEstablishmentsRepo
  );

  return {
    sut: new CreateEstablishmentController(createEstablishmentUseCase),
    createEstablishmentUseCase
  };
};

const makeFixture = () => ({
  body: {
    name: 'Establishment name',
    phone: '0000-0000',
    restaurateurId: 'restaurateur_id'
  },
  applicationData: { userId: 'any' }
});

const establishmentFixture = () => {
  const { name, phone, restaurateurId } = makeFixture().body;

  return Establishment.create({
    id: makeId({}).value as Id,
    name,
    phone: makePhone({ value: phone }).value as Phone,
    restaurateurId: makeId({ value: restaurateurId }).value as Id
  }).value as Establishment;
};

describe('Create Establishment Controller Unitary Tests', () => {
  it('should create an establishment', async () => {
    const { sut, createEstablishmentUseCase } = makeSut();

    jest
      .spyOn(createEstablishmentUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(right(establishmentFixture())));

    const fixture = makeFixture();

    const testable = await sut.handle(fixture);

    expect(testable.statusCode).toEqual(ok({}).statusCode);
    expect(testable.body).toEqual({
      ...fixture.body,
      id: 'id'
    });
  });

  it('should validate business exception', async () => {
    const { sut, createEstablishmentUseCase } = makeSut();

    jest
      .spyOn(createEstablishmentUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(left(new UserNotFound())));

    const testable = await sut.handle(makeFixture());

    const response = badRequest(new UserNotFound());

    expect(testable.statusCode).toEqual(response.statusCode);
    expect(testable.body).toEqual(response.body);
  });

  it('should validate an infra error', async () => {
    const { sut, createEstablishmentUseCase } = makeSut();

    jest
      .spyOn(createEstablishmentUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(left(new InfraError('any'))));

    const testable = await sut.handle(makeFixture());

    expect(testable.statusCode).toEqual(serverError().statusCode);
  });
});
