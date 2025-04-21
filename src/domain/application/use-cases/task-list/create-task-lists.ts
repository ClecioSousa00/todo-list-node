import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TaskList } from '@/domain/enterprise/entities/taskList'
import { TaskListRepository } from '../../repositories/task-list-repository'

interface TaskListsUseCaseRequest {
  title: string
  userId: string
}

interface TaskListsUseCaseResponse {
  taskList: TaskList
}

export class CreateTaskListsUseCases {
  constructor(private taskListsRepository: TaskListRepository) {}

  async execute({
    title,
    userId,
  }: TaskListsUseCaseRequest): Promise<TaskListsUseCaseResponse> {
    const taskList = TaskList.create({
      title,
      userId: new UniqueEntityID(userId),
    })

    await this.taskListsRepository.create(taskList)

    return {
      taskList,
    }
  }
}
