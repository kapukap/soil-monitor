import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { Device } from "./device.entity";
import { UsersService } from "../users/users.service";
import { User } from "../users/user.entity";
import { UsersRepository } from "../users/users.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Device, User]), AuthModule],
    providers: [DevicesService, UsersService, UsersRepository],
    controllers: [DevicesController]
})
export class DevicesModule {}
