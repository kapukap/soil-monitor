import { IsOptional, IsString } from 'class-validator';

export class UpdateDeviceUserDto {
  @IsOptional()
  @IsString()
      userId: string;
}
