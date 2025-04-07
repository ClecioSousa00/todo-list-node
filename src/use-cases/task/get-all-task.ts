import { TaskListsRepository } from '@/repositories/task-lists-repository'
import { TaskRepository } from '@/repositories/task-repository'
import { Task } from '@prisma/client'
import { TaskListNotFound } from '../errors/task-lists-not-found'

interface GetAllTasksUseCaseRequest {
  taskListId: string
  userId: string
}
interface GetAllTasksUseCaseResponse {
  tasks: Task[]
}

export class GetAllTasksUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private taskListRepository: TaskListsRepository,
  ) {}

  async execute({
    taskListId,
    userId,
  }: GetAllTasksUseCaseRequest): Promise<GetAllTasksUseCaseResponse> {
    const taskList = await this.taskListRepository.getById(taskListId, userId)

    if (!taskList) {
      throw new TaskListNotFound()
    }

    const tasks = await this.taskRepository.getAllTasks(taskListId)
    return {
      tasks,
    }
  }
}
