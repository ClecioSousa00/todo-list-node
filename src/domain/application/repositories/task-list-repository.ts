import { TaskList } from '@/domain/enterprise/entities/taskList'

export interface TaskListRepository {
  create(taskList: TaskList): Promise<void>
  getAll(userId: string): Promise<TaskList[]>
  getById(taskListId: string, userId: string): Promise<TaskList | null>
  searchMany(title: string, userId: string): Promise<TaskList[]>
  updateTitleTaskList(taskList: TaskList): Promise<void>

  deleteTaskList(taskList: TaskList): Promise<void>
}
