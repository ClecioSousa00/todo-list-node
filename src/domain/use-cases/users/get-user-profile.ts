import { User } from '@/domain/entities/user'
import { ResourceNotFoundError } from '@/domain/errors/resource-not-found'
import { UsersRepository } from '@/domain/repositories/users-repository'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new ResourceNotFoundError()

    return {
      user,
    }
  }
}
