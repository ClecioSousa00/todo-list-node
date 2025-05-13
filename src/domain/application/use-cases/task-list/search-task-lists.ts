import { TaskListRepository } from '../../repositories/task-list-repository'
import { UseCase } from '../use-case'

type TaskListProps = {
  title: string
  id: string
}

interface SearchTaskListsInputDto {
  userId: string
  title: string
}

interface SearchTaskListsOutputDto {
  taskLists: TaskListProps[]
}

export class SearchTaskListsUseCase
  implements UseCase<SearchTaskListsInputDto, SearchTaskListsOutputDto>
{
  constructor(private taskListRepository: TaskListRepository) {}

  async execute({
    userId,
    title,
  }: SearchTaskListsInputDto): Promise<SearchTaskListsOutputDto> {
    const taskLists = await this.taskListRepository.searchMany(title, userId)

    const outputTaskLists: TaskListProps[] = taskLists.map((taskList) => ({
      title: taskList.title,
      id: taskList.id.toString(),
    }))

    return {
      taskLists: outputTaskLists,
    }
  }
}
