import { Prisma, Task } from '@prisma/client'
import { TaskRepository } from '../task-repository'
import { randomUUID } from 'node:crypto'

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
}
