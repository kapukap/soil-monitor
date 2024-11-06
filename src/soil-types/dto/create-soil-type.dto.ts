import { IsNotEmpty } from 'class-validator';

export class CreateSoilTypeDto {
  @IsNotEmpty()
  name: string;
}
