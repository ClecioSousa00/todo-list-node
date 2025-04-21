import { TaskList } from '@/domain/entities/taskList'
import { TaskListRepository } from '@/domain/repositories/task-list-repository'

interface SearchTaskListsUseCaseRequest {
  userId: string
  title: string
}

interface SearchTaskListsUseCaseResponse {
  taskLists: TaskList[]
}

export class SearchTaskListsUseCase {
  constructor(private taskListRepository: TaskListRepository) {}

  async execute({
    userId,
    title,
  }: SearchTaskListsUseCaseRequest): Promise<SearchTaskListsUseCaseResponse> {
    const taskLists = await this.taskListRepository.searchMany(title, userId)

    return {
      taskLists,
    }
  }
}
