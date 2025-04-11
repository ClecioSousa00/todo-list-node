import { TaskListsRepository } from '@/repositories/task-lists-repository'

import { TaskListNotFound } from '../errors/task-lists-not-found'

interface DeleteTaskListUseCaseRequest {
  userId: string
  taskListId: string
}

interface DeleteTaskListUseCaseResponse {}

export class DeleteTaskListUseCase {
  constructor(private taskListRepository: TaskListsRepository) {}

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
