import { IsNotEmpty, IsOptional } from 'class-validator';
import { SoilTypeCodes } from '../soil-types.entity';

export class UpdateSoilTypeDto {
  @IsNotEmpty()
      name: string;

  @IsOptional()
      code: string;
      // code: SoilTypeCodes | string;

  @IsOptional()
      description: string;
}
