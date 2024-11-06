import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SoilType } from './soil-types.entity';

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

  async deleteSoilType(id: string): Promise<void> {
    const result = await this.soilTypeRepository.delete({ id });

    if (!result.affected) {
      throw new NotFoundException(`Soil Type with ID ${id} not found`);
    }
  }

  async updateSoilTypeName(id: string, name: string): Promise<SoilType> {
    const soilType = await this.getSoilTypeById(id);
    soilType.name = name;
    await this.soilTypeRepository.save(soilType);
    return soilType;
  }

  async createSoilType(soilData: Partial<SoilType>): Promise<SoilType> {
    const soilType = this.soilTypeRepository.create(soilData);
    return this.soilTypeRepository.save(soilType);
  }
}
