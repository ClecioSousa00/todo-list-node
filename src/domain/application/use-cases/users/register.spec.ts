import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'
import { UserAlreadyExistsError } from '@/domain/errors/user-already-exists-error'
import { FakerHasher } from 'test/cryptography/faker-hasher'

let inMemoryUsersRepository: InMemoryUserRepository
let fakeHasher: FakerHasher
let registerUseCase: RegisterUseCase
describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUserRepository()
    fakeHasher = new FakerHasher()
    registerUseCase = new RegisterUseCase(inMemoryUsersRepository, fakeHasher)
  })

  it('should be able to register', async () => {
    await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    const user = inMemoryUsersRepository.items[0]

    expect(user.id.toString()).toEqual(expect.any(String))
  })
  it('should hash user password upon registration', async () => {
    await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })
    const user = inMemoryUsersRepository.items[0]

    const hashedPassword = await fakeHasher.hash('123456')

    expect(user.password).toEqual(hashedPassword)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@gmail.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
