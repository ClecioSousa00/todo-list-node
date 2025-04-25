import { UserProps } from '@/@types/users'
import { User } from '@/domain/enterprise/entities/user'

export const makeUser = (override: Partial<UserProps> = {}) => {
  const user = User.create({
    email: 'johndoe@gmail.com',
    name: 'john doe',
    password: '123456',
    ...override,
  })
  return user
}
