import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { Device } from "./device.entity";
import { UsersService } from "../users/users.service";
import { User } from "../users/user.entity";
import { UsersRepository } from "../users/users.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Device, User]), AuthModule],
    providers: [DeviceService, UsersService, UsersRepository],
    controllers: [DeviceController]
})
export class DeviceModule {}
