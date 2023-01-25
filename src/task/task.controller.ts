import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { getUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guards";
import { TaskService } from "./task.service";
import { CreateTaskDto, EditTaskDto } from "./dto";

@UseGuards(JwtGuard)
@Controller("/tasks")
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks(@getUser("id") userId: number) {
    return this.taskService.getTasks(userId);
  }

  @Get(":id")
  getTaskById(
    @getUser("id") userId: number,
    @Param("id", ParseIntPipe) taskId: number
  ) {
    return this.taskService.getTaskById(userId, taskId);
  }

  @Post()
  createTask(@getUser("id") userId: number, @Body() dto: CreateTaskDto) {
    return this.taskService.createTask(userId, dto);
  }

  @Patch(":id")
  editTaskById(
    @getUser("id") userId: number,
    @Param("id", ParseIntPipe) taskId: number,
    @Body() dto: EditTaskDto
  ) {
    return this.taskService.editTaskById(userId, taskId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  deleteTaskById(
    @getUser("id") userId: number,
    @Param("id", ParseIntPipe) taskId: number
  ) {
    return this.taskService.deleteTaskById(userId, taskId);
  }
}
