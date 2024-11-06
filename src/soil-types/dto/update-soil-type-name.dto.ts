import { IsNotEmpty } from 'class-validator';

export class UpdateSoilTypeNameDto {
  @IsNotEmpty()
  name: string;
}
