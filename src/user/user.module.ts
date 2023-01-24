import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserController } from "./user.controller";
import { AuthController, AuthService } from "src/auth";
import { UserService } from "./user.service";

@Module({
  imports: [JwtModule],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService],
})
export class UserModule {}
