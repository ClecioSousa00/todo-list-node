import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Task } from '@/domain/enterprise/entities/task'
import { Prisma, Task as PrismaTask } from '@prisma/client'

export class PrismaTaskMapper {
  static toDomain(task: PrismaTask): Task {
    return Task.create(
      {
        description: task.description,
        dueDate: task.due_date,
        taskListId: new UniqueEntityID(task.task_list_id),
        isChecked: task.is_checked,
      },
      new UniqueEntityID(task.id),
    )
  }

  static toPrisma(task: Task): Prisma.TaskUncheckedCreateInput {
    return {
      id: task.id.toString(),
      description: task.description,
      due_date: task.dueDate,
      task_list_id: task.taskListId.toString(),
    }
  }
}
