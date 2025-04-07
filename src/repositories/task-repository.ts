import { UpdateTaskData } from '@/@types/task'
import { Prisma, Task } from '@prisma/client'

export interface TaskRepository {
  createMany(data: Prisma.TaskCreateManyInput[]): Promise<Task[]>
  updateTask(
    data: UpdateTaskData,
    taskListId: string,
    taskId: string,
  ): Promise<Task | null>
  deleteTask(taskId: string, taskListId: string): Promise<Task | null>
  getAllTasks(taskListId: string): Promise<Task[]>
}
