import { IsNotEmpty } from 'class-validator';

export class CreateBotDto {
  @IsNotEmpty()
      botTypeId: string;
  @IsNotEmpty()
      userId: string;
}
