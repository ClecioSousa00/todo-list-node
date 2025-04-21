import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface TaskListProps {
  title: string
  userId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}
