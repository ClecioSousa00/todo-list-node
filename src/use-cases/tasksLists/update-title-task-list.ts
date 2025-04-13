import { TaskListsRepository } from '@/repositories/task-lists-repository'
import { TaskListNotFound } from '../errors/task-lists-not-found'

interface UpdateTitleTaskListUseCaseRequest {
  title: string
  taskListId: string
  userId: string
}

interface UpdateTitleTaskListUseCaseResponse {}

export class UpdateTitleTaskListUseCase {
  constructor(private taskListRepository: TaskListsRepository) {}

  async execute({
    title,
    taskListId,
    userId,
  }: UpdateTitleTaskListUseCaseRequest): Promise<UpdateTitleTaskListUseCaseResponse> {
    const taskList = await this.taskListRepository.getById(taskListId, userId)

    if (!taskList) {
      throw new TaskListNotFound()
    }

    taskList.title = title

    await this.taskListRepository.updateTitleTaskList(taskList)

    return {}
  }
}
