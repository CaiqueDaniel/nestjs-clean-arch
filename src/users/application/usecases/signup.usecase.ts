import { UserRepository } from 'src/users/domain/repositories/user.repository'
import { BadRequestError } from '../errors/bad-request-error'
import { User } from 'src/users/domain/entities/user.entity'

export namespace SignupUseCase {
  export type Input = {
    name: string
    email: string
    password: string
  }
  export type Output = {
    id: string
    name: string
    email: string
    password: string
    createdAt: Date
  }

  export class UseCase {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const { email, name, password } = input

      if (!email || !name || !password) {
        throw new BadRequestError('Input data not provided')
      }

      await this.userRepository.emailExists(email)

      const entity = new User(input)

      await this.userRepository.insert(entity)
      return entity.toJSON()
    }
  }
}