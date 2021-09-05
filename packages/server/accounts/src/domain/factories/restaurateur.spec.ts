import { Restaurateur } from '@/domain/entities';
import { RestaurateurFactory, IdFactory, DocumentFactory, MakeRestaurateurProps } from '@/domain/factories';
import { FakeDocumentProvider, FakeIdProvider } from '@/ports/providers/fakes';
import { nullAsType } from '@/utils';
import { PropsAreRequired } from '../entities/errors';

const makeSut = () => {
  const idFactory = new IdFactory(new FakeIdProvider());
  const documentFactory = new DocumentFactory(new FakeDocumentProvider());

  return {
    sut: new RestaurateurFactory(idFactory, documentFactory),
    idFactory,
    documentFactory
  };
};

const makeFixture = (): MakeRestaurateurProps => ({
  id: {},
  userId: { value: 'user_id' },
  document: { value: 'document', toSanitize: true, type: 'CPF' }
});

describe('Restaurateur Factory Unitary Tests', () => {
  it('should create a valid restaurateur', () => {
    const { sut } = makeSut();

    const fixture = makeFixture();

    const testable = sut.make(fixture);

    expect(testable.isRight()).toBeTruthy();

    const restaurateur = testable.value as Restaurateur;

    expect(restaurateur.id.value).toEqual('generated');
    expect(restaurateur.userId.value).toEqual('user_id');
    expect(restaurateur.document.value).toEqual('sanitized');
  });

  it('should validate props itself', () => {
    const { sut } = makeSut();

    const testable = sut.make(nullAsType());

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate id', () => {
    const { sut } = makeSut();

    const testable = sut.make({
      ...makeFixture(),
      id: nullAsType()
    });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate userId', () => {
    const { sut } = makeSut();

    const testable = sut.make({
      ...makeFixture(),
      userId: nullAsType()
    });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });

  it('should validate document', () => {
    const { sut } = makeSut();

    const testable = sut.make({
      ...makeFixture(),
      document: nullAsType()
    });

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toBeInstanceOf(PropsAreRequired);
  });
});
