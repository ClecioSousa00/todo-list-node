export class TaskListNotFound extends Error {
  constructor() {
    super('Task list not found.')
  }
}
