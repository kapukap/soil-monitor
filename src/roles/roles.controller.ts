import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './role.entity';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

  @Get()
    async getAll(): Promise<Role[]> {
        return this.rolesService.getAll();
    }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Role> {
      return this.rolesService.getRoleById(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
      return this.rolesService.deleteRole(id);
  }

  @Patch('/:id/name')
  updateName(
    @Param('id') id: string,
    @Body() updateSoilTypeNameDto: UpdateRoleDto,
  ): Promise<Role> {
      const { name } = updateSoilTypeNameDto;

      return this.rolesService.updateRole(id, name);
  }

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
      const { name } = createRoleDto;
      return this.rolesService.createRole(name);
  }
}
