import { SigninUseCase } from "../../../users/application/usecases/signin-user.usecase"

export class SigninDto implements SigninUseCase.Input {
  email: string
  password: string
}