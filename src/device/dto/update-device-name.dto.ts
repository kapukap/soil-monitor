import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDeviceNameDto {
  @IsNotEmpty()
      name: string;

  @IsOptional()
  @IsString()
      userId: string;
}
