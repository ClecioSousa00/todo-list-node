import { TaskListsRepository } from '@/repositories/task-lists-repository'
import { TaskRepository } from '@/repositories/task-repository'
import { TaskListNotFound } from '../errors/task-lists-not-found'
import { TaskNotFound } from '../errors/task-not-found'

interface DeleteTaskUseCaseRequest {
  taskId: string
  taskListId: string
  userId: string
}

interface DeleteTaskUseCaseResponse {}

export class DeleteTaskUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private taskListsRepository: TaskListsRepository,
  ) {}

  async execute({
    taskId,
    taskListId,
    userId,
  }: DeleteTaskUseCaseRequest): Promise<DeleteTaskUseCaseResponse> {
    const taskList = await this.taskListsRepository.getById(taskListId, userId)

    if (!taskList) {
      throw new TaskListNotFound()
    }

    const task = await this.taskRepository.getTaskById(taskId, taskListId)

    if (!task) {
      throw new TaskNotFound()
    }

    await this.taskRepository.deleteTask(taskId)

    return {}
  }
}
