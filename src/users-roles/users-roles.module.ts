import { Module } from '@nestjs/common';
import { UsersRolesController } from './users-roles.controller';
import { UsersRolesService } from './users-roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Role } from '../roles/role.entity';
import { UserRole } from './users-roles.entity';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role, UserRole])],
    controllers: [UsersRolesController],
    providers: [UsersRolesService, RolesService, UsersService, UsersRepository],
    // exports: [UsersRolesService],
})
export class UsersRolesModule {}
