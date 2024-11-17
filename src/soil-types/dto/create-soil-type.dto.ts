import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSoilTypeDto {
  @IsNotEmpty()
      name: string;

  @IsOptional()
      description: string;
}
