import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Task } from '@prisma/client'

export type UpdateTaskData = Partial<
  Pick<Task, 'description' | 'is_checked' | 'due_date'>
>

export type TaskProps = {
  taskListId: UniqueEntityID
  description: string
  isChecked: boolean
  dueDate: Date
  createdAt: Date
  updatedAt?: Date
}
