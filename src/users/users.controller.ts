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
import { Role } from '../roles/role.entity';

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

  @Get('/:id/role')
  async getUserRole(@Param('id') id: string): Promise<Partial<Role>> {
      return this.usersService.getUserRole(id);
  }

  @Patch('/:id/role')
  async updateUserRole(
    @Param('id') id: string,
    @Body('roleId') roleId: string,
  ): Promise<Role> {
      return this.usersService.updateUserRole(id, roleId);
  }
}
