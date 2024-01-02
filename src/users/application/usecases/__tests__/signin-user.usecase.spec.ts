import { NotFoundError } from "rxjs";
import { BadRequestError } from "src/@shared/domain/errors/bad-request-error";
import { InvalidCredentialsError } from "src/@shared/domain/errors/invalid-credentials-error";
import { UserDataBuilder } from "src/users/domain/testing/helpers/user-data-builder";
import { UserInMemoryRepository } from "src/users/infrastructure/database/in-memory/repositories/in-memory-user.repository";
import { BcryptjsHashProvider } from "src/users/infrastructure/providers/bcryptjs-hash-provider";
import { HashProvider } from "../../providers/hash-provider";
import { SigninUseCase } from "../signin-user.usecase";
import { User } from "src/users/domain/entities/user.entity";


describe('SigninUseCase unit tests', () => {
  let sut: SigninUseCase.UseCase;
  let repository: UserInMemoryRepository;
  let hashProvider: HashProvider;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    hashProvider = new BcryptjsHashProvider();
    sut = new SigninUseCase.UseCase(repository, hashProvider);
  });

  it('Should authenticate a user', async () => {
    const spyFindByEmail = jest.spyOn(repository, 'findByEmail');
    const hashPassword = await hashProvider.generateHash('1234');
    const entity = new User(
      UserDataBuilder({ email: 'a@a.com', password: hashPassword }),
    );
    repository.items = [entity];

    const result = await sut.execute({
      email: entity.email,
      password: '1234',
    });
    expect(spyFindByEmail).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(entity.toJSON());
  });

  it('Should throws error when email not provided', async () => {
    await expect(() =>
      sut.execute({ email: null, password: '1234' }),
    ).rejects.toBeInstanceOf(BadRequestError);
  });

  it('Should throws error when password not provided', async () => {
    await expect(() =>
      sut.execute({ email: 'a@a.com', password: null }),
    ).rejects.toBeInstanceOf(BadRequestError);
  });

  it('Should not be able authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({ email: 'a@a.com', password: '1234' }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('Should not be able authenticate with wrong password', async () => {
    const hashPassword = await hashProvider.generateHash('1234');
    const entity = new User(
      UserDataBuilder({ email: 'a@a.com', password: hashPassword }),
    );
    repository.items = [entity];

    await expect(() =>
      sut.execute({ email: 'a@a.com', password: 'fake' }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
