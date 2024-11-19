import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateDeviceNameDto } from "./dto/update-device-name.dto";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { UsersService } from "../users/users.service";
import { ErrorCodes } from "../Utils/Errors/errors-constaints.enum";
import { Device } from './device.entity';
import { UpdateDeviceUserDto } from './dto/update-device-user.dto';

@Injectable()
export class DeviceService {
    constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
    private readonly usersService: UsersService,
    ) {}

    async getAll(): Promise<Device[]> {
        return this.deviceRepository.find();
    }

    async getDeviceById(id: string): Promise<Device> {
        return  await this.deviceRepository.findOneBy({ id });

        // if (!bot) throw new NotFoundException();
        // return bot;
    }

    async deleteDevice(id: string): Promise<void> {
        const result = await this.deviceRepository.delete({ id });

        if (!result.affected) {
            throw new NotFoundException(`Device with ID ${id} not found`);
        }
    }

    async updateDeviceName(
        id: string,
        updateDeviceNameDto: UpdateDeviceNameDto,
    ): Promise<Device> {
        const {name, userId} = updateDeviceNameDto;
        const device = await this.getDeviceById(id);
        if (!device) throw new NotFoundException(`Device with ID ${id} not found`);
        if (device.userId === userId || !device.userId) {
            device.name = name;

            try {
                await this.deviceRepository.save(device);
                return device;
            } catch (e) {
                throw new InternalServerErrorException();
            }
        } else {
            throw new ConflictException('Permission Exception!');
        }
    }

    // Назначение пользователя девайся, если его нет
    async updateDeviceUser(
        id: string,
        updateDeviceUserDto: UpdateDeviceUserDto
    ): Promise<Device> {
        const {userId} = updateDeviceUserDto;
        const device = await this.getDeviceById(id);
        if (!device) throw new NotFoundException(`Device with ID ${id} not found`);
        if (device.userId) throw new ConflictException(`Device Already Added`);

        device.userId = userId;
        await this.deviceRepository.save(device);
        return device;
    }

    // Отвязка девайса от текущего пользователя
    async unlinkDeviceUser(
        id: string,
        updateDeviceUserDto: UpdateDeviceUserDto
    ): Promise<Device> {
        const {userId} = updateDeviceUserDto;
        const device = await this.getDeviceById(id);
        if (!device) throw new NotFoundException(`Device with ID ${id} not found`);
        if (!device.userId) return device;
        if (device.userId === userId) {
            device.userId = null;
        }

        try {
            await this.deviceRepository.save(device);
            return device;
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }

    async createDevice(
        createDeviceDto: CreateDeviceDto,
    ): Promise<Device> {
        // Если не найдет тип, выдаст ошибку

        const device = this.deviceRepository.create(createDeviceDto);
        // Code Generator
        device.code = 'dev-' + Date.now().toString(36);

        try {
            return await this.deviceRepository.save(device);
        }   catch (e) {
            switch (e.code) {
                case ErrorCodes.UNIQUE_ERROR_CODE:
                    throw new ConflictException('Device with this data has already exists');
                case ErrorCodes.NOT_NULL_ERROR_CODE:
                    throw new ConflictException('Fill Required values');
                default:
                    throw new InternalServerErrorException();
            }
        }

    }
}
