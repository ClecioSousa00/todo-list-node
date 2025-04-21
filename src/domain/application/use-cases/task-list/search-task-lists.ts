import { TaskList } from '@/domain/enterprise/entities/taskList'

import { TaskListRepository } from '../../repositories/task-list-repository'

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
