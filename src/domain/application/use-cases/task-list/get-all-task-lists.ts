import { TaskListRepository } from '../../repositories/task-list-repository'
import { UseCase } from '../use-case'

type TaskListProps = {
  title: string
  id: string
}

interface TaskListInputDto {
  userId: string
}

interface TaskListsOutputDto {
  taskLists: TaskListProps[]
}

export class GetAllTaskListsUseCases
  implements UseCase<TaskListInputDto, TaskListsOutputDto>
{
  constructor(private taskListsRepository: TaskListRepository) {}

  async execute({ userId }: TaskListInputDto): Promise<TaskListsOutputDto> {
    const taskLists = await this.taskListsRepository.getAll(userId)

    const outputTaskLists: TaskListProps[] = taskLists.map((taskList) => ({
      title: taskList.title,
      id: taskList.id.toString(),
    }))

    return {
      taskLists: outputTaskLists,
    }
  }
}
