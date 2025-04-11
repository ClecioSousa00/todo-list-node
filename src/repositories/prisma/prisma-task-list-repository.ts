import { Prisma, TaskLists } from '@prisma/client'
import { TaskListsRepository } from '../task-lists-repository'
import { prisma } from '@/lib/prisma'

export class PrismaTaskListsRepository implements TaskListsRepository {
  async create(data: Prisma.TaskListsUncheckedCreateInput): Promise<TaskLists> {
    const taskList = await prisma.taskLists.create({
      data,
    })

    return taskList
  }

  async getAll(userId: string): Promise<TaskLists[]> {
    const taskLists = await prisma.taskLists.findMany({
      where: {
        user_id: userId,
      },
    })
    return taskLists
  }

  async getById(taskListId: string, userId: string): Promise<TaskLists | null> {
    const taskLists = await prisma.taskLists.findUnique({
      where: {
        id: taskListId,
        user_id: userId,
      },
    })

    return taskLists
  }

  async searchMany(title: string, userId: string): Promise<TaskLists[]> {
    const taskLists = await prisma.taskLists.findMany({
      where: {
        user_id: userId,
        title: {
          contains: title,
        },
      },
    })

    return taskLists
  }

  async updateTitleTaskList(taskList: TaskLists) {
    await prisma.taskLists.update({
      where: {
        id: taskList.id,
      },
      data: {
        title: taskList.title,
      },
    })
  }

  async deleteTaskList(taskList: TaskLists) {
    await prisma.taskLists.delete({
      where: {
        id: taskList.id,
      },
    })
  }
}
