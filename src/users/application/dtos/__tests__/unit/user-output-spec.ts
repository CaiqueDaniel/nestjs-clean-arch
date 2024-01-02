import { UserDataBuilder } from "../../../../../users/domain/testing/helpers/user-data-builder"
import { UserOutputMapper } from "../../user-output"
import { User } from "../../../../../users/domain/entities/user.entity"

describe('UserOutputMapper unit tests', () => {
  it('should convert a user in output', () => {
    const entity = new User(UserDataBuilder({}))
    const spyToJson = jest.spyOn(entity, 'toJSON')
    const sut = UserOutputMapper.toOutput(entity)

    expect(spyToJson).toHaveBeenCalled()
    expect(sut).toStrictEqual(entity.toJSON())
  })
})