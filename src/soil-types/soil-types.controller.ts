import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { SoilTypesService } from './soil-types.service';
import { SoilType } from './soil-types.entity';
import { UpdateSoilTypeDto } from './dto/update-soil-type.dto';
import { CreateSoilTypeDto } from './dto/create-soil-type.dto';

@Controller('soil-types')
export class SoilTypesController {
  constructor(private readonly soilTypesService: SoilTypesService) {}

  @Get()
  async getAll(): Promise<SoilType[]> {
    return this.soilTypesService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<SoilType> {
    return this.soilTypesService.getSoilTypeById(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.soilTypesService.deleteSoilType(id);
  }

  @Patch('/:id')
  updateName(
    @Param('id') id: string,
    @Body() updateSoilTypeDto: UpdateSoilTypeDto,
  ): Promise<SoilType> {
    return this.soilTypesService.updateSoilTypeName(id, updateSoilTypeDto);
  }

  @Post()
  async create(
    @Body() createSoilTypeDto: CreateSoilTypeDto,
  ): Promise<SoilType> {
    return this.soilTypesService.createSoilType(createSoilTypeDto);
  }
}
