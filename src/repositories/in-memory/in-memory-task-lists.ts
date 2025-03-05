import { Prisma, TaskLists } from '@prisma/client'
import { TaskListsRepository } from '../task-lists-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryTaskListsRepository implements TaskListsRepository {
  public items: TaskLists[] = []
  async create(data: Prisma.TaskListsUncheckedCreateInput) {
    const taskList: TaskLists = {
      id: randomUUID(),
      title: data.title,
      user_id: data.user_id,
      created_at: new Date(),
    }

    this.items.push(taskList)
    return taskList
  }

  async getAll(userId: string) {
    const userTaskLists = this.items.filter((item) => item.user_id === userId)
    return userTaskLists
  }
}
