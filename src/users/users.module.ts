import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { Role } from "../roles/role.entity";
import { RolesService } from "../roles/roles.service";

@Module({
    imports: [TypeOrmModule.forFeature([User, Role]), AuthModule],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository, RolesService],
    exports: [UsersRepository],
})
export class UsersModule {}
