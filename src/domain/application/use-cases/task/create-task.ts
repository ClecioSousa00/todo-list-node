import { Task } from '@/domain/enterprise/entities/task'
import { TaskRepository } from '../../repositories/task-repository'
import { TaskListRepository } from '../../repositories/task-list-repository'
import { TaskListNotFound } from '@/domain/errors/task-lists-not-found'
import { UseCase } from '../use-case'

type Tasks = Pick<Task, 'description' | 'dueDate'>

interface TasksUseInputDto {
  tasks: Tasks[]
  taskListId: string
  userId: string
}

interface TaskOutputDto {}

export class CreateTasksUseCases
  implements UseCase<TasksUseInputDto, TaskOutputDto>
{
  constructor(
    private tasksRepository: TaskRepository,
    private taskListsRepository: TaskListRepository,
  ) {}

  async execute({
    tasks,
    taskListId,
    userId,
  }: TasksUseInputDto): Promise<TaskOutputDto> {
    const taskList = await this.taskListsRepository.getById(taskListId, userId)

    if (!taskList) {
      throw new TaskListNotFound()
    }

    const createTasks = tasks.map((task) => {
      const newTask = Task.create({
        description: task.description,
        dueDate: task.dueDate,
        taskListId: taskList.id,
      })
      return newTask
    })

    await this.tasksRepository.createMany(createTasks)

    return {}
  }
}
