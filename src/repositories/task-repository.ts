import { UpdateTaskData } from '@/@types/task'
import { Prisma, Task } from '@prisma/client'

export interface TaskRepository {
  createMany(data: Prisma.TaskCreateManyInput[]): Promise<void>
  updateTask(data: UpdateTaskData, taskId: string): Promise<void>
  deleteTask(taskId: string): Promise<void>
  getAllTasks(taskListId: string): Promise<Task[]>
  getTaskById(taskId: string, taskListId: string): Promise<Task | null>
}
