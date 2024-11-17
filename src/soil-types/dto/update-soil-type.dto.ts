import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateSoilTypeDto {
  @IsNotEmpty()
      name: string;

  @IsOptional()
      description: string;
}
