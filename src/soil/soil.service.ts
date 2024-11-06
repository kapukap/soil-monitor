import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Soil } from './soil.entity';

@Injectable()
export class SoilService {
  constructor(
    @InjectRepository(Soil)
    private readonly soilRepository: Repository<Soil>,
  ) {}

  async getAll(): Promise<Soil[]> {
    return this.soilRepository.find();
  }

  async getById(id: number): Promise<Soil> {
    return this.soilRepository.findOne({
      where: { id },
    });
  }

  async create(soilData: Partial<Soil>): Promise<Soil> {
    const newSoil = this.soilRepository.create(soilData);
    return this.soilRepository.save(newSoil);
  }
}
