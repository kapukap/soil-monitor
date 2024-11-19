import { IsNotEmpty, IsOptional } from 'class-validator';
import { SoilTypeCodes } from '../soil-types.entity';

export class UpdateSoilTypeDto {
  @IsNotEmpty()
      name: string;

  @IsOptional()
      code: SoilTypeCodes;

  @IsOptional()
      description: string;
}
