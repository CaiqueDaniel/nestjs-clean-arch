import { NotFoundError } from "rxjs"
import { InvalidPasswordError } from "../../../../@shared/domain/errors/invalid-password-error"
import { UserDataBuilder } from "../../../../users/domain/testing/helpers/user-data-builder"
import { UserInMemoryRepository } from "../../../../users/infrastructure/database/in-memory/repositories/in-memory-user.repository"
import { BcryptjsHashProvider } from "../../../../users/infrastructure/providers/bcryptjs-hash-provider"
import { HashProvider } from "../../providers/hash-provider"
import { UpdatePasswordUseCase } from "../update-password.usecase"
import { User } from "../../../../users/domain/entities/user.entity"


describe('UpdatePasswordUseCase unit tests', () => {
  let sut: UpdatePasswordUseCase.UseCase
  let repository: UserInMemoryRepository
  let hashProvider: HashProvider

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    hashProvider = new BcryptjsHashProvider()
    sut = new UpdatePasswordUseCase.UseCase(repository, hashProvider)
  })

  it('Should throws error when entity not found', async () => {
    await expect(() =>
      sut.execute({
        id: 'fakeId',
        password: 'test password',
        oldPassword: 'old password',
      }),
    ).rejects.toThrow(new NotFoundError('Entity not found'))
  })

  it('Should throws error when old password not provided', async () => {
    const entity = new User(UserDataBuilder({}))
    repository.items = [entity]
    await expect(() =>
      sut.execute({
        id: entity.id,
        password: 'test password',
        oldPassword: '',
      }),
    ).rejects.toThrow(
      new InvalidPasswordError('Old password and new password is required'),
    )
  })

  it('Should throws error when new password not provided', async () => {
    const entity = new User(UserDataBuilder({ password: '1234' }))
    repository.items = [entity]
    await expect(() =>
      sut.execute({
        id: entity.id,
        password: '',
        oldPassword: '1234',
      }),
    ).rejects.toThrow(
      new InvalidPasswordError('Old password and new password is required'),
    )
  })

  it('Should throws error when new old password does not match', async () => {
    const hashPassword = await hashProvider.generateHash('1234')
    const entity = new User(UserDataBuilder({ password: hashPassword }))
    repository.items = [entity]
    await expect(() =>
      sut.execute({
        id: entity.id,
        password: '4567',
        oldPassword: '123456',
      }),
    ).rejects.toThrow(new InvalidPasswordError('Old password does not match'))
  })

  it('Should update a password', async () => {
    const hashPassword = await hashProvider.generateHash('1234')
    const spyUpdate = jest.spyOn(repository, 'update')
    const items = [new User(UserDataBuilder({ password: hashPassword }))]
    repository.items = items

    const result = await sut.execute({
      id: items[0].id,
      password: '4567',
      oldPassword: '1234',
    })

    const checkNewPassword = await hashProvider.compareHash(
      '4567',
      result.password,
    )
    expect(spyUpdate).toHaveBeenCalledTimes(1)
    expect(checkNewPassword).toBeTruthy()
  })
})