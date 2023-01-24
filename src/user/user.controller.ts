import { EditUserDto } from "./dto/edit-user.dto";
import { Controller, UseGuards, Get, Patch, Body } from "@nestjs/common";
import { JwtGuard } from "src/auth/guards";
import { getUser } from "src/auth/decorator";
import { User } from "@prisma/client";
import { UserService } from "./user.service";

@UseGuards(JwtGuard)
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}
  @Get("me")
  getMe(@getUser() user: User) {
    return user;
  }
  @Patch()
  editUser(@getUser("id") userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
