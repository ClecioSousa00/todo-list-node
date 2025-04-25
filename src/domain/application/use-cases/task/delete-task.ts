import { TaskListNotFound } from '@/domain/errors/task-lists-not-found'
import { TaskListRepository } from '../../repositories/task-list-repository'
import { TaskRepository } from '../../repositories/task-repository'
import { TaskNotFound } from '@/domain/errors/task-not-found'

interface DeleteTaskUseCaseRequest {
  taskId: string
  taskListId: string
  userId: string
}

interface DeleteTaskUseCaseResponse {}

export class DeleteTaskUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private taskListsRepository: TaskListRepository,
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

    await this.taskRepository.deleteTask(task)

    return {}
  }
}
