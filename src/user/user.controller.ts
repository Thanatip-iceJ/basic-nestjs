import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  createUser(@Body() input: Prisma.UserCreateInput) {
    return this.userService.createUser(input);
  }

  @Get('getall') // user/getall
  getAllUser() {
    return this.userService.getAllUsers();
  }

  @Put(':id')
  updateUser(
    @Body() body: Prisma.UserUpdateInput,
    @Param() param: { id: number },
  ) {
    const id = +param.id;
    return this.userService.update(body, id);
  }

  @Delete(':id')
  deleteUser(@Param() param: { id: number }) {
    const id = +param.id;
    return this.userService.deleteUser(id);
  }
}
