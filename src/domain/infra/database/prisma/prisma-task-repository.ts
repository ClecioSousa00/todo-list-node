import { TaskRepository } from '@/domain/application/repositories/task-repository'
import { Task } from '@/domain/enterprise/entities/task'
import { prisma } from '@/lib/prisma'
import { PrismaTaskMapper } from './mappers/prismaTaskMapper'

export class PrismaTaskRepository implements TaskRepository {
  async createMany(task: Task[]): Promise<void> {
    const tasks = task.map((item) => PrismaTaskMapper.toPrisma(item))

    await prisma.task.createMany({
      data: tasks,
    })
  }

  async updateTask(task: Task): Promise<void> {
    const data = PrismaTaskMapper.toPrisma(task)

    await prisma.task.update({
      where: {
        id: task.id.toString(),
      },
      data,
    })
  }

  async deleteTask(task: Task): Promise<void> {
    await prisma.task.delete({
      where: {
        id: task.id.toString(),
      },
    })
  }

  async getAllTasks(taskListId: string): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: {
        task_list_id: taskListId,
      },
    })

    return tasks.map((task) => PrismaTaskMapper.toDomain(task))
  }

  async getTaskById(taskId: string, taskListId: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
        task_list_id: taskListId,
      },
    })

    if (!task) return null

    return PrismaTaskMapper.toDomain(task)
  }
}
