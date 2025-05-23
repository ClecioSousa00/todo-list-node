import { Optional } from '@/@types/optional'
import { TaskListProps } from '@/@types/taskList'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class TaskList extends Entity<TaskListProps> {
  get userId() {
    return this.props.userId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<TaskListProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const user = new TaskList(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )
    return user
  }
}
