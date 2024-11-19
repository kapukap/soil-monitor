import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoilIndicatorsController } from './soil-indicators.controller';
import { SoilIndicatorsService } from './soil-indicators.service';
import { AuthModule } from '../auth/auth.module';
import { SoilIndicators } from './soil-indicators.entity';
import { DeviceService } from '../device/device.service';
import { Device } from '../device/device.entity';
import { SoilTypesService } from '../soil-types/soil-types.service';
import { SoilType } from '../soil-types/soil-types.entity';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { User } from '../users/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SoilIndicators, SoilType, Device, User]), AuthModule],
    controllers: [SoilIndicatorsController],
    providers: [SoilIndicatorsService, SoilTypesService, DeviceService, UsersService, UsersRepository],
})
export class SoilIndicatorsModule {}
