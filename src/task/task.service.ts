import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTaskDto, EditTaskDto } from "./dto";

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  getTasks(userId: number) {
    try {
      return this.prisma.task.findMany({
        where: {
          userId,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  getTaskById(userId: number, taskId: number) {
    return this.prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    });
  }

  async createTask(userId: number, dto: CreateTaskDto) {
    try {
      const task = await this.prisma.task.create({
        data: {
          userId,
          ...dto,
        },
      });
      return task;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async editTaskById(userId: number, taskId: number, dto: EditTaskDto) {
    // get the task by id
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    // check if user owns the task
    if (!task || task.userId !== userId)
      throw new ForbiddenException("Access to resources denied");

    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteTaskById(userId: number, taskId: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    // check if user owns the task
    if (!task || task.userId !== userId)
      throw new ForbiddenException("Access to resources denied");

    await this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
