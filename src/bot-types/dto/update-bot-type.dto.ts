import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateBotTypeDto {
  @IsNotEmpty()
      name: string;

  @IsOptional()
      description: string;
}
