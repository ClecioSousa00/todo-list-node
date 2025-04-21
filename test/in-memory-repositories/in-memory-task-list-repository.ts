import { TaskListRepository } from '@/domain/application/repositories/task-list-repository'
import { TaskList } from '@/domain/enterprise/entities/taskList'

export class InMemoryTaskListRepository implements TaskListRepository {
  public items: TaskList[] = []
  async create(taskList: TaskList) {
    this.items.push(taskList)
  }

  async getAll(userId: string) {
    const userTaskLists = this.items.filter(
      (item) => item.userId.toString() === userId,
    )
    return userTaskLists
  }

  async getById(taskListId: string, userId: string) {
    const taskList = this.items.find(
      (item) =>
        item.id.toString() === taskListId && item.userId.toString() === userId,
    )

    return taskList || null
  }

  async searchMany(title: string, userId: string) {
    const userTaskLists = this.items.filter(
      (item) => item.userId.toString() === userId,
    )

    const taskLists = userTaskLists.filter((item) =>
      item.title.toLowerCase().includes(title.toLowerCase()),
    )

    return taskLists
  }

  async updateTitleTaskList(taskList: TaskList) {
    const taskListIndex = this.items.findIndex(
      (item) => item.id.toString() === taskList.id.toString(),
    )

    this.items[taskListIndex] = taskList
  }

  async deleteTaskList(taskList: TaskList) {
    const taskListIndex = this.items.findIndex(
      (item) => item.id.toString() === taskList.id.toString(),
    )

    this.items.splice(taskListIndex, 1)
  }
}
