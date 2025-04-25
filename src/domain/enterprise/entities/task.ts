import { Optional } from '@/@types/optional'
import { TaskProps } from '@/@types/task'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class Task extends Entity<TaskProps> {
  get description() {
    return this.props.description
  }

  get dueDate() {
    return this.props.dueDate
  }

  get taskListId() {
    return this.props.taskListId
  }

  set description(description: string) {
    this.props.description = description
    this.props.updatedAt = new Date()
  }

  set dueDate(dueDate: Date) {
    this.props.dueDate = dueDate
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<TaskProps, 'createdAt' | 'isChecked'>,
    id?: UniqueEntityID,
  ) {
    const user = new Task(
      {
        ...props,
        createdAt: new Date(),
        isChecked: false,
      },
      id,
    )
    return user
  }
}
