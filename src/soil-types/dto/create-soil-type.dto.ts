import { IsNotEmpty, IsOptional } from 'class-validator';
import { SoilTypeCodes } from '../soil-types.entity';

export class CreateSoilTypeDto {
  @IsNotEmpty()
      name: string;

  @IsNotEmpty()
      code: SoilTypeCodes;

  @IsOptional()
      description: string;
}
