import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { Device } from "./device.entity";
import { UsersService } from "../users/users.service";
import { User } from "../users/user.entity";
import { UsersRepository } from "../users/users.repository";
import { Role } from "../roles/role.entity";
import { RolesService } from "../roles/roles.service";

@Module({
    imports: [TypeOrmModule.forFeature([Device, User, Role]), AuthModule],
    providers: [DevicesService, UsersService, UsersRepository, RolesService],
    controllers: [DevicesController]
})
export class DevicesModule {}
