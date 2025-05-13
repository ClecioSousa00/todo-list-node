import { TaskListNotFound } from '@/domain/errors/task-lists-not-found'
import { TaskListRepository } from '../../repositories/task-list-repository'
import { UseCase } from '../use-case'

interface UpdateTitleTaskListInputDto {
  title: string
  taskListId: string
  userId: string
}

interface UpdateTitleTaskListOutputDto {}

export class UpdateTitleTaskListUseCase
  implements UseCase<UpdateTitleTaskListInputDto, UpdateTitleTaskListOutputDto>
{
  constructor(private taskListRepository: TaskListRepository) {}

  async execute({
    title,
    taskListId,
    userId,
  }: UpdateTitleTaskListInputDto): Promise<UpdateTitleTaskListOutputDto> {
    const taskList = await this.taskListRepository.getById(taskListId, userId)

    if (!taskList) {
      throw new TaskListNotFound()
    }

    taskList.title = title

    await this.taskListRepository.updateTitleTaskList(taskList)

    return {}
  }
}
