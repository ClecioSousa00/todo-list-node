import { Prisma, TaskLists } from '@prisma/client'

export type UpdateTitleTaskListProps = {
  title: string
  taskListId: string
  userId: string
}

export interface TaskListsRepository {
  create(data: Prisma.TaskListsUncheckedCreateInput): Promise<TaskLists>
  getAll(userId: string): Promise<TaskLists[]>
  getById(taskListId: string, userId: string): Promise<TaskLists | null>
  searchMany(title: string, userId: string): Promise<TaskLists[]>
  updateTitleTaskList(
    props: UpdateTitleTaskListProps,
  ): Promise<TaskLists | null>

  deleteTaskList(
    userId: string,
    taskListId: string,
  ): Promise<TaskLists[] | null>
}
