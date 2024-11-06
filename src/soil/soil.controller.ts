import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SoilService } from './soil.service';
import { Soil } from './soil.entity';

@Controller('soil-measure')
export class SoilController {
  constructor(private readonly soilService: SoilService) {}

  @Get()
  async getAll(): Promise<Soil[]> {
    return this.soilService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: number): Promise<Soil> {
    return this.soilService.getById(id);
  }

  @Post()
  async create(@Body() soilData: Partial<Soil>): Promise<Soil> {
    console.log(soilData);
    return this.soilService.create(soilData);
  }
}
