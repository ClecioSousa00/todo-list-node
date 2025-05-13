import { TaskListNotFound } from '@/domain/errors/task-lists-not-found'
import { TaskListRepository } from '../../repositories/task-list-repository'
import { UseCase } from '../use-case'

interface DeleteTaskListInputDto {
  userId: string
  taskListId: string
}

interface DeleteTaskListOutputDto {}

export class DeleteTaskListUseCase
  implements UseCase<DeleteTaskListInputDto, DeleteTaskListOutputDto>
{
  constructor(private taskListRepository: TaskListRepository) {}

  async execute({
    userId,
    taskListId,
  }: DeleteTaskListInputDto): Promise<DeleteTaskListOutputDto> {
    const taskList = await this.taskListRepository.getById(taskListId, userId)

    if (!taskList) {
      throw new TaskListNotFound()
    }

    await this.taskListRepository.deleteTaskList(taskList)

    return {}
  }
}
