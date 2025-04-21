import { TaskListNotFound } from '@/domain/errors/task-lists-not-found'
import { TaskListRepository } from '../../repositories/task-list-repository'
interface DeleteTaskListUseCaseRequest {
  userId: string
  taskListId: string
}

interface DeleteTaskListUseCaseResponse {}

export class DeleteTaskListUseCase {
  constructor(private taskListRepository: TaskListRepository) {}

  async execute({
    userId,
    taskListId,
  }: DeleteTaskListUseCaseRequest): Promise<DeleteTaskListUseCaseResponse> {
    const taskList = await this.taskListRepository.getById(taskListId, userId)

    if (!taskList) {
      throw new TaskListNotFound()
    }

    await this.taskListRepository.deleteTaskList(taskList)

    return {}
  }
}
