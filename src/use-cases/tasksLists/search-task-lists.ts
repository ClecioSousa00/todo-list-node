import { TaskListsRepository } from '@/repositories/task-lists-repository'
import { TaskLists } from '@prisma/client'

interface SearchTaskListsUseCaseRequest {
  userId: string
  title: string
}

interface SearchTaskListsUseCaseResponse {
  taskLists: TaskLists[]
}

export class SearchTaskListsUseCase {
  constructor(private taskListRepository: TaskListsRepository) {}

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
