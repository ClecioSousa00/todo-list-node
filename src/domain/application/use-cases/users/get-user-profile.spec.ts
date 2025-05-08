import { describe, it, expect, beforeEach } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile'
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'
import { ResourceNotFoundError } from '@/domain/errors/resource-not-found'
import { makeUser } from 'test/factories/make-user'

let usersRepository: InMemoryUserRepository
let getUserProfileUseCase: GetUserProfileUseCase
describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)
  })
  it('should be able to get user profile', async () => {
    const user = makeUser()
    await usersRepository.create(user)

    const { userProfile } = await getUserProfileUseCase.execute({
      userId: user.id.toString(),
    })

    expect(userProfile.id).toEqual(expect.any(String))
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      getUserProfileUseCase.execute({
        userId: 'fake id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
