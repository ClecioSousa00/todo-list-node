import { TaskListsRepository } from '@/repositories/task-lists-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { TaskLists } from '@prisma/client'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface TaskListsUseCaseRequest {
  title: string
  userId: string
}

interface TaskListsUseCaseResponse {
  taskList: TaskLists
}

export class CreateTaskListsUseCases {
  constructor(
    private taskListsRepository: TaskListsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    title,
    userId,
  }: TaskListsUseCaseRequest): Promise<TaskListsUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    if (!user) throw new InvalidCredentialsError()

    const taskList = await this.taskListsRepository.create({
      title,
      user_id: userId,
    })

    return {
      taskList,
    }
  }
}
