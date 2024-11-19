import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { UpdateDeviceNameDto } from './dto/update-device-name.dto';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Device } from './device.entity';
import { UpdateDeviceUserDto } from './dto/update-device-user.dto';


@Controller('device')
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) {}
  @Get()
    async getAll(): Promise<Device[]> {
        return this.deviceService.getAll();
    }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Device> {
      return this.deviceService.getDeviceById(id);
  }


  @Get('/:id/soil-indicators')
  async getSoilIndicatorsById(@Param('id') id: string): Promise<Device> {
      return this.deviceService.getDeviceById(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
      return this.deviceService.deleteDevice(id);
  }

  @Patch('/:id/name')
  updateName(
    @Param('id') id: string,
    @Body() updateDeviceNameDto: UpdateDeviceNameDto,
  ): Promise<Device> {
      return this.deviceService.updateDeviceName(id, updateDeviceNameDto);
  }

  @Patch('/:id/user')
  updateUser(
    @Param('id') id: string,
    @Body() updateDeviceUserDto: UpdateDeviceUserDto,
  ): Promise<Device> {
      return this.deviceService.updateDeviceUser(id, updateDeviceUserDto);
  }


  @Patch('/:id/unlink')
  unlinkUser(
    @Param('id') id: string,
    @Body() updateDeviceUserDto: UpdateDeviceUserDto,
  ): Promise<Device> {
      return this.deviceService.unlinkDeviceUser(id, updateDeviceUserDto);
  }

  @Post()
  async create(@Body() createBotDto: CreateDeviceDto): Promise<Device> {
      return this.deviceService.createDevice(createBotDto);
  }
}
