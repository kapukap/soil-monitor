import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { UsersRolesService } from './users-roles.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UserRole } from './users-roles.entity';

@Controller('users-roles')
export class UsersRolesController {
    constructor(private readonly usersRolesService: UsersRolesService) {}

  // Получить роли по пользователю
  @Get()
    async getAll() {
        return this.usersRolesService.getAll();
    }

  // Получить роли по пользователю
  @Get(':userId')
  async getUserRoles(@Param('userId') userId: string) {
      return this.usersRolesService.getUserRole(userId);
  }

  @Post()
  async create(
    @Body() createUserRoleDto: CreateUserRoleDto,
  ): Promise<UserRole> {
      return this.usersRolesService.createUserRole(createUserRoleDto);
  }

  // Удалить роль у пользователя
  @Delete(':userId')
  async removeRole(@Param('userId') userId: string) {
      return this.usersRolesService.removeRoleFromUser(userId);
  }

  @Patch('/:userId')
  async updateUserRole(
    @Param('userId') userId: string,
    @Body() updateRoleDto: { roleId: string },
  ): Promise<UserRole> {
      return this.usersRolesService.updateUserRole(userId, updateRoleDto.roleId);
  }
}
