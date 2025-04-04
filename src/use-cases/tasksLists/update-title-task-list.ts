import { TaskListsRepository } from '@/repositories/task-lists-repository'
import { TaskLists } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found'

interface UpdateTitleTaskListUseCaseRequest {
  title: string
  taskListId: string
  userId: string
}

interface UpdateTitleTaskListUseCaseResponse {
  taskList: TaskLists
}

export class UpdateTitleTaskListUseCase {
  constructor(private taskListRepository: TaskListsRepository) {}

  async execute({
    title,
    taskListId,
    userId,
  }: UpdateTitleTaskListUseCaseRequest): Promise<UpdateTitleTaskListUseCaseResponse> {
    const taskList = await this.taskListRepository.updateTitleTaskList({
      title,
      taskListId,
      userId,
    })

    if (!taskList) throw new ResourceNotFoundError()

    return {
      taskList,
    }
  }
}
