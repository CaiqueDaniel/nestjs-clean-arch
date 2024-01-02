import { NotFoundError } from "rxjs"
import { BadRequestError } from "../../../../@shared/domain/errors/bad-request-error"
import { UserDataBuilder } from "../../../../users/domain/testing/helpers/user-data-builder"
import { UserInMemoryRepository } from "../../../../users/infrastructure/database/in-memory/repositories/in-memory-user.repository"
import { UpdateUserUseCase } from "../update-user.usecase"
import { User } from "../../../../users/domain/entities/user.entity"


describe('UpdateUserUseCase unit tests', () => {
  let sut: UpdateUserUseCase.UseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new UpdateUserUseCase.UseCase(repository)
  })

  it('Should throws error when entity not found', async () => {
    await expect(() =>
      sut.execute({ id: 'fakeId', name: 'test name' }),
    ).rejects.toThrow(new NotFoundError('Entity not found'))
  })

  it('Should throws error when name not provided', async () => {
    await expect(() => sut.execute({ id: 'fakeId', name: '' })).rejects.toThrow(
      new BadRequestError('Name not provided'),
    )
  })

  it('Should update a user', async () => {
    const spyUpdate = jest.spyOn(repository, 'update')
    const items = [new User(UserDataBuilder({}))]
    repository.items = items

    const result = await sut.execute({ id: items[0].id, name: 'new name' })
    expect(spyUpdate).toHaveBeenCalledTimes(1)
    expect(result).toMatchObject({
      id: items[0].id,
      name: 'new name',
      email: items[0].email,
      password: items[0].password,
      createdAt: items[0].createdAt,
    })
  })
})