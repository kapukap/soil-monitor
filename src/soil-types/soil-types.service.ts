import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SoilType, SoilTypeCodes } from './soil-types.entity';
import { UpdateSoilTypeDto } from './dto/update-soil-type.dto';
import { CreateSoilTypeDto } from './dto/create-soil-type.dto';

@Injectable()
export class SoilTypesService {
    constructor(
    @InjectRepository(SoilType)
    private readonly soilTypeRepository: Repository<SoilType>,
    ) {}

    async getAll(): Promise<SoilType[]> {
        return this.soilTypeRepository.find();
    }

    async getSoilTypeById(id: string): Promise<SoilType> {
        const soilType = await this.soilTypeRepository.findOneBy({ id });

        if (!soilType) throw new NotFoundException();
        return soilType;
    }


    async getSoilTypeIdByCode(code: SoilTypeCodes): Promise<SoilType> {
        return  await this.soilTypeRepository.findOneBy({ code });
    }

    async deleteSoilType(id: string): Promise<void> {
        const result = await this.soilTypeRepository.delete({ id });

        if (!result.affected) {
            throw new NotFoundException(`Soil Type with ID ${id} not found`);
        }
    }

    async updateSoilTypeName(
        id: string,
        updateSoilTypeDto: UpdateSoilTypeDto,
    ): Promise<SoilType> {
        const soilType = await this.getSoilTypeById(id);
        const { name, description } = updateSoilTypeDto;

        soilType.name = name;
        soilType.description = description;

        await this.soilTypeRepository.save(soilType);
        return soilType;
    }

    async createSoilType(
        createSoilTypeDto: CreateSoilTypeDto,
    ): Promise<SoilType> {
        const soilType = this.soilTypeRepository.create(createSoilTypeDto);
        return this.soilTypeRepository.save(soilType);
    }
}
