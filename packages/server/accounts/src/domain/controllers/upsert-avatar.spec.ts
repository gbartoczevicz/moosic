import { UpsertAvatarController } from '@/domain/controllers';
import { User } from '@/domain/entities';
import { UpsertAvatarUseCase } from '@/domain/use-cases';
import { InfraError } from '@/ports/errors';
import { badRequest, serverError } from '@/ports/http/helpers';
import { left, right } from '@/utils';
import { UserNotFound } from '@/domain/use-cases/errors';

function makeSut() {
  const usecase = new UpsertAvatarUseCase({} as any, {} as any, {} as any, {} as any);

  return {
    sut: new UpsertAvatarController(usecase),
    usecase
  };
}

function makeFixture() {
  return {
    applicationData: { userId: 'any_id' },
    body: { filename: 'file.png' }
  };
}

function makeUser(id: string, avatar: string) {
  return {
    id: { value: id },
    email: { value: 'any' },
    phone: { value: 'any' },
    password: { value: 'any' },
    avatar,
    toPlain: () => 'any'
  } as unknown as User;
}

describe('UpsertAvatarController', () => {
  it("should update user's avatar", async () => {
    const { sut, usecase } = makeSut();

    const fixture = makeFixture();
    const user = makeUser(fixture.applicationData.userId, fixture.body.filename);

    jest.spyOn(usecase, 'execute').mockImplementation(() => Promise.resolve(right(user)));

    const testable = await sut.handle(fixture);

    expect(testable.body).toStrictEqual(user.toPlain());
  });

  it('should validate business exception', async () => {
    const { sut, usecase } = makeSut();

    jest.spyOn(usecase, 'execute').mockImplementation(() => Promise.resolve(left(new UserNotFound())));

    const testable = await sut.handle(makeFixture());

    const response = badRequest(new UserNotFound());

    expect(testable.statusCode).toEqual(response.statusCode);
    expect(testable.body).toEqual(response.body);
  });

  it('should validate an infra error', async () => {
    const { sut, usecase } = makeSut();

    jest.spyOn(usecase, 'execute').mockImplementation(() => Promise.resolve(left(new InfraError('any'))));

    const testable = await sut.handle(makeFixture());

    expect(testable.statusCode).toEqual(serverError().statusCode);
  });
});
