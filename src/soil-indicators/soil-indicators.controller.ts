import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SoilIndicators } from './soil-indicators.entity';
import { SoilIndicatorsService } from './soil-indicators.service';
import { CreateSoilIndicatorsDto } from './dto/create-soil-indicators.dto';

@Controller('soil-indicators')
export class SoilIndicatorsController {
    constructor(private readonly soilIndicatorsService: SoilIndicatorsService) {}

  @Get()
    async getAll(): Promise<SoilIndicators[]> {
        return this.soilIndicatorsService.getAll();
    }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<SoilIndicators> {
      return this.soilIndicatorsService.getById(id);
  }

  @Get('/device/:deviceId')
  async getByDeviceId(@Param('deviceId') deviceId: string): Promise<SoilIndicators[]> {
      return this.soilIndicatorsService.getByDeviceId(deviceId);
  }

  @Post()
  async create(@Body() createSoilIndicatorsDto: CreateSoilIndicatorsDto): Promise<SoilIndicators> {
      return this.soilIndicatorsService.create(createSoilIndicatorsDto);
  }
}
