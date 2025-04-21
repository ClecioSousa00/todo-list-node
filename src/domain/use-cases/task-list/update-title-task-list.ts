import { TaskListNotFound } from '@/domain/errors/task-lists-not-found'
import { TaskListRepository } from '@/domain/repositories/task-list-repository'

interface UpdateTitleTaskListUseCaseRequest {
  title: string
  taskListId: string
  userId: string
}

interface UpdateTitleTaskListUseCaseResponse {}

export class UpdateTitleTaskListUseCase {
  constructor(private taskListRepository: TaskListRepository) {}

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
