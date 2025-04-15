import { UpdateTaskData } from '@/@types/task'
import { Prisma, Task } from '@prisma/client'
import { TaskRepository } from '../task-repository'
import { prisma } from '@/lib/prisma'

export class PrismaTaskRepository implements TaskRepository {
  async createMany(data: Prisma.TaskCreateManyInput[]): Promise<void> {
    await prisma.task.createMany({
      data,
    })
  }

  async updateTask(data: UpdateTaskData, taskId: string): Promise<void> {
    await prisma.task.updateMany({
      where: {
        id: taskId,
      },
      data,
    })
  }

  async deleteTask(taskId: string): Promise<void> {
    await prisma.task.delete({
      where: {
        id: taskId,
      },
    })
  }

  async getAllTasks(taskListId: string): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: {
        task_list_id: taskListId,
      },
    })
    return tasks
  }

  async getTaskById(taskId: string, taskListId: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
        task_list_id: taskListId,
      },
    })

    return task
  }
}
