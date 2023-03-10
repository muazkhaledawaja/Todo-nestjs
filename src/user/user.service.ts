import { EditUserDto } from "./dto/edit-user.dto";
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { ...dto },
    });
    delete user.hash;
    return user;
  }
}
