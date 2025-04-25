import { Task } from '@/domain/enterprise/entities/task'
import { TaskRepository } from '../../repositories/task-repository'
import { TaskListRepository } from '../../repositories/task-list-repository'
import { TaskListNotFound } from '@/domain/errors/task-lists-not-found'

type Tasks = Pick<Task, 'description' | 'dueDate'>

interface TasksUseCaseRequest {
  tasks: Tasks[]
  taskListId: string
  userId: string
}

interface TasksUseCaseResponse {}

export class CreateTasksUseCases {
  constructor(
    private tasksRepository: TaskRepository,
    private taskListsRepository: TaskListRepository,
  ) {}

  async execute({
    tasks,
    taskListId,
    userId,
  }: TasksUseCaseRequest): Promise<TasksUseCaseResponse> {
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

    // const formattedTasks = tasks.map((task) => ({
    //   description: task.description,
    //   due_date: task.due_date,
    //   task_list_id: taskListId,
    // }))

    await this.tasksRepository.createMany(createTasks)

    return {}
  }
}
