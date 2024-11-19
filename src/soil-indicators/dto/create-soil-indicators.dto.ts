import { IsNumber, IsString } from 'class-validator';
import { SoilTypeCodes } from '../../soil-types/soil-types.entity';

export class CreateSoilIndicatorsDto {
  @IsNumber()
      moisture: number;

  @IsNumber()
      temperature: number;

  @IsNumber()
      acidity: number;

  @IsNumber()
      electricalConductivity: number;

  @IsNumber()
      nitrogen: number;

  @IsNumber()
      phosphorus: number;

  @IsNumber()
      potassium: number;

  @IsString()
      soilTypeCode: SoilTypeCodes;

  @IsString()
      deviceCode: string;
}
