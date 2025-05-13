import { TaskListRepository } from '@/domain/application/repositories/task-list-repository'
import { TaskList } from '@/domain/enterprise/entities/taskList'
import { prisma } from '@/lib/prisma'
import { PrismaTaskListMapper } from './mappers/prismaTaskListMapper'

export class PrismaTaskListRepository implements TaskListRepository {
  async create(taskList: TaskList): Promise<void> {
    await prisma.taskLists.create({
      data: {
        title: taskList.title,
        user_id: taskList.userId.toString(),
      },
    })
  }

  async getAll(userId: string): Promise<TaskList[]> {
    const allTaskLists = await prisma.taskLists.findMany({
      where: {
        user_id: userId,
      },
    })

    const taskLists = allTaskLists.map((taskList) =>
      PrismaTaskListMapper.toDomain(taskList),
    )

    return taskLists
  }

  async getById(taskListId: string, userId: string): Promise<TaskList | null> {
    const taskList = await prisma.taskLists.findUnique({
      where: {
        id: taskListId,
        user_id: userId,
      },
    })

    if (!taskList) return null

    return PrismaTaskListMapper.toDomain(taskList)
  }

  async searchMany(title: string, userId: string): Promise<TaskList[]> {
    const allTaskLists = await prisma.taskLists.findMany({
      where: {
        user_id: userId,
        title: {
          contains: title.toLowerCase(),
          mode: 'insensitive',
        },
      },
    })
    const taskLists = allTaskLists.map((taskList) =>
      PrismaTaskListMapper.toDomain(taskList),
    )

    return taskLists
  }

  async updateTitleTaskList(taskList: TaskList): Promise<void> {
    await prisma.taskLists.update({
      where: {
        id: taskList.id.toString(),
      },
      data: {
        title: taskList.title,
      },
    })
  }

  async deleteTaskList(taskList: TaskList): Promise<void> {
    await prisma.taskLists.delete({
      where: {
        id: taskList.id.toString(),
      },
    })
  }
}
