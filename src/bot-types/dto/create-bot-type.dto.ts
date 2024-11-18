import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBotTypeDto {
  @IsNotEmpty()
      name: string;

  @IsOptional()
      description: string;
}
