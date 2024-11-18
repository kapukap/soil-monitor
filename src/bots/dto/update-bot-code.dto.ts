import { IsNotEmpty } from 'class-validator';

export class UpdateBotCodeDto {
  @IsNotEmpty()
      code: string;
}
