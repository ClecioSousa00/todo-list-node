import { randomUUID } from 'node:crypto'

export class Task {
  id: string
  description: string
  taskListId: string
  isChecked: boolean

  constructor(
    description: string,
    taskListId: string,
    isChecked: boolean,
    id?: string,
  ) {
    this.description = description
    this.taskListId = taskListId
    this.isChecked = isChecked
    this.id = id ?? randomUUID()
  }
}
