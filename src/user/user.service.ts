import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma-service/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(input: Prisma.UserCreateInput) {
    try {
      const user = await this.prismaService.user.create({
        data: input,
      });
      return user;
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }

  async getAllUsers() {
    try {
      const allUsers = await this.prismaService.user.findMany();
      return allUsers;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async update(body: Prisma.UserUpdateInput, id: number) {
    try {
      const foundUser = await this.prismaService.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!foundUser) {
        throw new NotFoundException('not found bro');
      }
      const updatedUser = await this.prismaService.user.update({
        data: body,
        where: {
          id: id,
        },
      });
      return updatedUser;
    } catch (err) {
      console.log(err);
      if (err.status === 404) {
        throw new NotFoundException(err.response.message);
      }
      throw new BadRequestException(err.response.message);
    }
  }
  async deleteUser(id: number) {
    try {
      const foundUser = await this.prismaService.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!foundUser) {
        throw new NotFoundException('not found bro');
      }
      await this.prismaService.user.delete({
        where: {
          id: id,
        },
      });
      return { message: 'user has been deleted' };
    } catch (err) {
      console.log(err);
      if (err.status === 404) {
        throw new NotFoundException(err.response.message);
      }
      throw new InternalServerErrorException(err.response.message);
    }
  }
}
