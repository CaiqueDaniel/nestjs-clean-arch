import { NotFoundError } from "rxjs"
import { UserDataBuilder } from "src/users/domain/testing/helpers/user-data-builder"
import { UserInMemoryRepository } from "src/users/infrastructure/database/in-memory/repositories/in-memory-user.repository"
import { DeleteUserUseCase } from "../delete-user.usecase"
import { User } from "src/users/domain/entities/user.entity"

describe('DeleteUserUseCase unit tests', () => {
  let sut: DeleteUserUseCase.UseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new DeleteUserUseCase.UseCase(repository)
  })

  it('Should throws error when entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should delete a user', async () => {
    const spyDelete = jest.spyOn(repository, 'delete')
    const items = [new User(UserDataBuilder({}))]
    repository.items = items

    expect(repository.items).toHaveLength(1)
    await sut.execute({ id: items[0].id })
    expect(spyDelete).toHaveBeenCalledTimes(1)
    expect(repository.items).toHaveLength(0)
  })
})