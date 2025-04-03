import { Prisma, TaskLists } from '@prisma/client'

export interface TaskListsRepository {
  create(data: Prisma.TaskListsUncheckedCreateInput): Promise<TaskLists>
  getAll(userId: string): Promise<TaskLists[]>
  getById(taskListId: string): Promise<TaskLists | null>
  searchMany(title: string, userId: string): Promise<TaskLists[]>
}
