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

  async getById(taskListId: string, userId: string): Promise<TaskLists | null> {
    const taskList = this.items.find(
      (item) => item.id === taskListId && item.user_id === userId,
    )

    return taskList || null
  }

  async searchMany(title: string, userId: string) {
    const userTaskLists = this.items.filter((item) => item.user_id === userId)

    const taskLists = userTaskLists.filter((item) =>
      item.title.toLowerCase().includes(title.toLowerCase()),
    )

    return taskLists
  }

  async updateTitleTaskList(taskList: TaskLists) {
    const taskListIndex = this.items.findIndex(
      (item) => item.id === taskList.id,
    )

    this.items[taskListIndex] = taskList
  }

  async deleteTaskList(taskList: TaskLists) {
    const taskListIndex = this.items.findIndex(
      (item) => item.id === taskList.id,
    )

    this.items.splice(taskListIndex, 1)
  }
}
