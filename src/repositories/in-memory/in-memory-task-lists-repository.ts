import { Prisma, TaskLists } from '@prisma/client'
import {
  TaskListsRepository,
  UpdateTitleTaskListProps,
} from '../task-lists-repository'
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

  async getById(taskListId: string): Promise<TaskLists | null> {
    const taskList = this.items.find((item) => item.id === taskListId)

    return taskList || null
  }

  async searchMany(title: string, userId: string) {
    const userTaskLists = this.items.filter((item) => item.user_id === userId)

    const taskLists = userTaskLists.filter((item) =>
      item.title.toLowerCase().includes(title.toLowerCase()),
    )

    return taskLists
  }

  async updateTitleTaskList(props: UpdateTitleTaskListProps) {
    const { title, taskListId, userId } = props

    const taskListIndex = this.items.findIndex(
      (item) => item.id === taskListId && item.user_id === userId,
    )

    if (taskListIndex === -1) return null

    const updatedTaskList = {
      ...this.items[taskListIndex],
      title,
    }

    this.items[taskListIndex] = updatedTaskList

    return updatedTaskList
  }

  async deleteTaskList(userId: string, taskListId: string) {
    const taskListIndex = this.items.findIndex(
      (item) => item.user_id === userId && item.id === taskListId,
    )

    if (taskListIndex === -1) return null

    this.items.splice(taskListIndex, 1)

    const updatedTaskLists = this.items.filter(
      (item) => item.user_id === userId,
    )
    return updatedTaskLists
  }
}
