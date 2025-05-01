import { Optional } from '@/@types/optional'
import { UserProps } from '@/@types/users'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class User extends Entity<UserProps> {
  get password() {
    return this.props.password
  }

  get email() {
    return this.props.email
  }

  get name() {
    return this.props.name
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return user
  }
}
