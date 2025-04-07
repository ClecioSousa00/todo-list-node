import { Prisma, Task } from '@prisma/client'
import { TaskRepository } from '../task-repository'
import { randomUUID } from 'node:crypto'
import { UpdateTaskData } from '@/@types/task'

export class InMemoryTaskRepository implements TaskRepository {
  public items: Task[] = []

  async createMany(data: Prisma.TaskCreateManyInput[]) {
    const tasks = data.map((task) => ({
      id: randomUUID(),
      description: task.description,
      is_checked: task.is_checked ?? false,
      due_date: task.due_date ? new Date(task.due_date) : new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      task_list_id: task.task_list_id,
    }))

    this.items.push(...tasks)
    return tasks
  }

  async updateTask(
    data: UpdateTaskData,
    taskListId: string,
    taskId: string,
  ): Promise<Task | null> {
    const taskIndex = this.items.findIndex(
      (item) => item.task_list_id === taskListId && item.id === taskId,
    )

    if (taskIndex === -1) return null

    const task = this.items[taskIndex]

    const updateTask: Task = {
      ...task,
      ...data,
      updated_at: new Date(),
    }

    this.items[taskIndex] = updateTask

    return updateTask
  }

  async deleteTask(taskId: string, taskListId: string) {
    const index = this.items.findIndex(
      (task) => task.id === taskId && task.task_list_id === taskListId,
    )
    if (index === -1) return null

    const deleted = this.items[index]
    this.items.splice(index, 1)
    return deleted
  }

  async getAllTasks(taskListId: string) {
    const tasks = this.items.filter((item) => item.task_list_id === taskListId)
    return tasks
  }
}
