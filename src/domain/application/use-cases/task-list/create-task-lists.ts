import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TaskList } from '@/domain/enterprise/entities/taskList'
import { TaskListRepository } from '../../repositories/task-list-repository'
import { UsersRepository } from '../../repositories/users-repository'
import { ResourceNotFoundError } from '@/domain/errors/resource-not-found'
import { UseCase } from '../use-case'

interface TaskListsInputDto {
  title: string
  userId: string
}

interface TaskListsOutputDto {
  taskListId: string
}

export class CreateTaskListsUseCases
  implements UseCase<TaskListsInputDto, TaskListsOutputDto>
{
  constructor(
    private taskListsRepository: TaskListRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    title,
    userId,
  }: TaskListsInputDto): Promise<TaskListsOutputDto> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const taskList = TaskList.create({
      title,
      userId: new UniqueEntityID(user.id.toString()),
    })

    await this.taskListsRepository.create(taskList)

    return {
      taskListId: taskList.id.toString(),
    }
  }
}
