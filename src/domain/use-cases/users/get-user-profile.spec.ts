import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'
import { ResourceNotFoundError } from '@/domain/errors/resource-not-found'
import { User } from '@/domain/entities/user'

let usersRepository: InMemoryUserRepository
let getUserProfileUseCase: GetUserProfileUseCase
describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)
  })
  it('should be able to get user profile', async () => {
    const createdUser = User.create({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: await hash('123456', 6),
    })
    await usersRepository.create(createdUser)

    const { user } = await getUserProfileUseCase.execute({
      userId: createdUser.id.toString(),
    })

    expect(user.id.toString()).toEqual(expect.any(String))
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      getUserProfileUseCase.execute({
        userId: 'fake id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
