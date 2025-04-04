import { TaskListsRepository } from '@/repositories/task-lists-repository'
import { TaskLists } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found'

interface DeleteTaskListUseCaseRequest {
  userId: string
  taskListId: string
}

interface DeleteTaskListUseCaseResponse {
  taskLists: TaskLists[]
}

export class DeleteTaskListUseCase {
  constructor(private taskListRepository: TaskListsRepository) {}

  async execute({
    userId,
    taskListId,
  }: DeleteTaskListUseCaseRequest): Promise<DeleteTaskListUseCaseResponse> {
    const taskLists = await this.taskListRepository.deleteTaskList(
      userId,
      taskListId,
    )

    if (taskLists === null) throw new ResourceNotFoundError()

    return {
      taskLists,
    }
  }
}
