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
import { UpdateSoilTypeNameDto } from './dto/update-soil-type-name.dto';
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

  @Patch('/:id/name')
  updateName(
    @Param('id') id: string,
    @Body() updateSoilTypeNameDto: UpdateSoilTypeNameDto,
  ): Promise<SoilType> {
    const { name } = updateSoilTypeNameDto;

    return this.soilTypesService.updateSoilTypeName(id, name);
  }

  @Post()
  async create(
    @Body() createSoilTypeDto: CreateSoilTypeDto,
  ): Promise<SoilType> {
    return this.soilTypesService.createSoilType(createSoilTypeDto);
  }
}
