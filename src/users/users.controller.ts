import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  @Get()
    async getAll(): Promise<User[]> {
        return this.usersService.getAll();
    }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<User> {
      return this.usersService.getUserById(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
      return this.usersService.deleteUser(id);
  }

  @Post('')
  signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
      return this.usersService.createUser(createUserDto);
  }

  @Patch('/:id')
  updateName(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
      return this.usersService.updateUser(id, updateUserDto);
  }
  //
  // @Patch(':userId/roles/:roleId')
  // async addRole(
  //   @Param('userId') userId: string,
  //   @Param('roleId') roleId: string,
  // ) {
  //   return await this.usersService.addRoleToUser(userId, roleId);
  // }
}
