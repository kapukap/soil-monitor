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
export class DevicesService {
    constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
    private readonly usersService: UsersService,
    ) {}

    async getAll(): Promise<Device[]> {
        return  this.deviceRepository.find({
            relations: ['user'],
            select: {
                user: {
                    nick: true
                },
            },
        });
    }

    async getDeviceById(id: string): Promise<Device> {
        return  await this.deviceRepository.findOneBy({ id });
    }

    async getDeviceByCode(code: string): Promise<Device> {
        return  await this.deviceRepository.findOneBy({ code });
    }

    async getLatestIndicatorsByUser(userId: string): Promise<any> {
        const devices = await this.deviceRepository.find({
            where: { user: { id: userId } },
            relations: ['soilIndicators'],
            select: {
                id: true,
                name: true,
                soilIndicators: {
                    id: true,
                    nitrogen: true,
                    phosphorus: true,
                    potassium: true,
                    electricalConductivity: true,
                    createdAt: true,
                },
            },
        });

        return devices.map((device) => {
            const [first, ...other] = device.soilIndicators.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            return {
                deviceId: device.id,
                deviceName: device.name,
                indicators: first
            };
        });
    }

    async getLastIndicatorsByUser(userId: string): Promise<any> {
        const devices = await this.deviceRepository.find({
            where: { user: { id: userId } },
            relations: ['soilIndicators'],
            select: {
                id: true,
                name: true,
                code: true,
                soilIndicators: {
                    id: true,
                    moisture: true,
                    temperature: true,
                    acidity: true,
                    createdAt: true,
                },
            },
        });

        if (!devices.length) {
            return {};
        }

        const sortedDevices = devices
            .filter((device) => device.soilIndicators.length > 0)
            .sort((a, b) => {
                const aLastCreatedAt = Math.max(
                    ...a.soilIndicators.map((indicator) => new Date(indicator.createdAt).getTime())
                );
                const bLastCreatedAt = Math.max(
                    ...b.soilIndicators.map((indicator) => new Date(indicator.createdAt).getTime())
                );
                return bLastCreatedAt - aLastCreatedAt;
            });

        return sortedDevices[0];
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

    // Призначення користувача девайсу, якщо його немає
    async updateDeviceUser(
        code: string,
        updateDeviceUserDto: UpdateDeviceUserDto
    ): Promise<Device> {
        const {userId} = updateDeviceUserDto;
        const device = await this.getDeviceByCode(code);
        const user = await this.usersService.getUserById(userId);

        if (!device) throw new NotFoundException(`Device with Code ${code} not found`);
        if (device.userId) throw new ConflictException(`Device Already Added`);
        if (!user) throw new NotFoundException();

        device.userId = userId;
        console.log(device);
        await this.deviceRepository.save(device);
        return device;
    }

    // Відв'язування девайса від поточного користувача
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
        // Якщо тип не знайде, видасть помилку

        const device = this.deviceRepository.create(createDeviceDto);
        // Code Generator
        device.code = 'dvc-' + Date.now().toString(36);

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
