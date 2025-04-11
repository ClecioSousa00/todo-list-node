import { TaskListsRepository } from '@/repositories/task-lists-repository'
import { TaskLists } from '@prisma/client'
import { TaskListNotFound } from '../errors/task-lists-not-found'

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
    const taskList = await this.taskListRepository.getById(taskListId, userId)

    if (!taskList) {
      throw new TaskListNotFound()
    }

    taskList.title = title

    await this.taskListRepository.updateTitleTaskList(taskList)

    return {
      taskList,
    }
  }
}
