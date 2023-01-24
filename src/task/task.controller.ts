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
  gettasks(@getUser("id") userId: number) {
    return this.taskService.gettasks(userId);
  }

  @Get(":id")
  gettaskById(
    @getUser("id") userId: number,
    @Param("id", ParseIntPipe) taskId: number
  ) {
    return this.taskService.gettaskById(userId, taskId);
  }

  @Post()
  createtask(@getUser("id") userId: number, @Body() dto: CreateTaskDto) {
    return this.taskService.createtask(userId, dto);
  }

  @Patch(":id")
  edittaskById(
    @getUser("id") userId: number,
    @Param("id", ParseIntPipe) taskId: number,
    @Body() dto: EditTaskDto
  ) {
    return this.taskService.edittaskById(userId, taskId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  deletetaskById(
    @getUser("id") userId: number,
    @Param("id", ParseIntPipe) taskId: number
  ) {
    return this.taskService.deletetaskById(userId, taskId);
  }
}
