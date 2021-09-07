import { CreateRestaurateurUseCase, GetUserUseCase } from '@/domain/use-cases';
import { CreateRestaurateurController } from '@/domain/controllers';
import { RestaurateurFactory } from '@/domain/factories';
import { FakeRestaurateurRepo } from '@/ports/database/fakes';
import { Restaurateur } from '@/domain/entities';
import { makeId } from '@/domain/entities/values/fakes';
import { Document, Id } from '@/domain/entities/values';
import { left, right } from '@/utils';
import { badRequest, ok, serverError } from '@/ports/http/helpers';
import { InfraError } from '@/ports/errors';
import { UserNotFound } from '../use-cases/errors';

const makeSut = () => {
  const createRestaurateurUseCase = new CreateRestaurateurUseCase(
    {} as RestaurateurFactory,
    {} as FakeRestaurateurRepo,
    {} as GetUserUseCase
  );

  return {
    sut: new CreateRestaurateurController(createRestaurateurUseCase),
    createRestaurateurUseCase
  };
};

const makeFixture = () => ({
  body: {
    userId: 'any user id',
    document: 'any document'
  }
});

const restaurateurFixture = () => {
  const { userId, document } = makeFixture().body;

  return Restaurateur.create({
    id: makeId({}).value as Id,
    userId: makeId({ value: userId }).value as Id,
    document: Document.create({ value: document }).value as Document
  }).value as Restaurateur;
};

describe('Create Restaurateur Controller Unitary Tests', () => {
  it('should create an restaurateur', async () => {
    const { sut, createRestaurateurUseCase } = makeSut();

    jest
      .spyOn(createRestaurateurUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(right(restaurateurFixture())));

    const fixture = makeFixture();

    const testable = await sut.handle(fixture);

    expect(testable.statusCode).toEqual(ok({}).statusCode);
    expect(testable.body).toEqual({
      ...fixture.body,
      id: 'id'
    });
  });

  it('should validate business exception', async () => {
    const { sut, createRestaurateurUseCase } = makeSut();

    jest
      .spyOn(createRestaurateurUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(left(new UserNotFound())));

    const testable = await sut.handle(makeFixture());

    const response = badRequest(new UserNotFound());

    expect(testable.statusCode).toEqual(response.statusCode);
    expect(testable.body).toEqual(response.body);
  });

  it('should validate an infra error', async () => {
    const { sut, createRestaurateurUseCase } = makeSut();

    jest
      .spyOn(createRestaurateurUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(left(new InfraError('any'))));

    const testable = await sut.handle(makeFixture());

    expect(testable.statusCode).toEqual(serverError().statusCode);
  });
});
