import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TaskList } from '@/domain/enterprise/entities/taskList'
import { Prisma, TaskLists as PrismaTaskLists } from '@prisma/client'

export class PrismaTaskListMapper {
  static toDomain(prismaTaskList: PrismaTaskLists): TaskList {
    return TaskList.create(
      {
        title: prismaTaskList.title,
        userId: new UniqueEntityID(prismaTaskList.id),
        createdAt: prismaTaskList.created_at,
      },
      new UniqueEntityID(prismaTaskList.id),
    )
  }

  static toPrisma(taskList: TaskList): Prisma.TaskListsUncheckedCreateInput {
    return {
      id: taskList.id.toString(),
      title: taskList.title,
      user_id: taskList.userId.toString(),
      created_at: taskList.createdAt,
    }
  }
}
