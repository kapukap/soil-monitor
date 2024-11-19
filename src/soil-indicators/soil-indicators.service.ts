import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SoilIndicators } from './soil-indicators.entity';
import { CreateSoilIndicatorsDto } from './dto/create-soil-indicators.dto';
import { DeviceService } from '../device/device.service';
import { SoilTypesService } from '../soil-types/soil-types.service';

@Injectable()
export class SoilIndicatorsService {
    constructor(
    @InjectRepository(SoilIndicators)
    private readonly soilIndicatorsRepository: Repository<SoilIndicators>,
    private readonly soilTypesService: SoilTypesService,
    private readonly deviceService: DeviceService,
    ) {}

    async getAll(): Promise<SoilIndicators[]> {
        return this.soilIndicatorsRepository.find();
    }

    async getById(id: number): Promise<SoilIndicators> {
        return this.soilIndicatorsRepository.findOne({
            where: { id },
        });
    }

    async create(createSoilIndicatorsDto: CreateSoilIndicatorsDto): Promise<SoilIndicators> {
        const {soilTypeCode, deviceCode} = createSoilIndicatorsDto;

        const device = await this.deviceService.getDeviceByCode(deviceCode);
        const soilType = await this.soilTypesService.getSoilTypeIdByCode(soilTypeCode);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const newSoil: SoilIndicators = this.soilIndicatorsRepository.create(createSoilIndicatorsDto);
        if (device) newSoil.deviceId = device.id;
        newSoil.soilTypeId = soilType.id;

        return this.soilIndicatorsRepository.save(newSoil);
    }
}
