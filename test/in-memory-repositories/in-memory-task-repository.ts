import { TaskRepository } from '@/domain/application/repositories/task-repository'
import { Task } from '@/domain/enterprise/entities/task'

export class InMemoryTaskRepository implements TaskRepository {
  public items: Task[] = []

  async createMany(task: Task[]) {
    this.items.push(...task)
  }

  async updateTask(task: Task) {
    const taskIndex = this.items.findIndex(
      (item) => item.id.toString() === task.id.toString(),
    )

    this.items[taskIndex] = task
  }

  async deleteTask(task: Task) {
    const taskIndex = this.items.findIndex(
      (item) => item.id.toString() === task.id.toString(),
    )

    this.items.splice(taskIndex, 1)
  }

  async getAllTasks(taskListId: string) {
    const tasks = this.items.filter(
      (item) => item.taskListId.toString() === taskListId,
    )

    return tasks
  }

  async getTaskById(taskId: string, taskListId: string) {
    const task = this.items.find(
      (item) =>
        item.id.toString() === taskId &&
        item.taskListId.toString() === taskListId,
    )

    return task ?? null
  }
}
