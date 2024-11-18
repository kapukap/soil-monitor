import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { BotTypesService } from './bot-types.service';
import { CreateBotTypeDto } from './dto/create-bot-type.dto';
import { UpdateBotTypeDto } from './dto/update-bot-type.dto';
import { BotType } from "./bot-types.entity";

@Controller('bot-types')
export class BotTypesController {
    constructor(private readonly botTypesService: BotTypesService) {}

  @Get()
    async getAll(): Promise<BotType[]> {
        return this.botTypesService.getAll();
    }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<BotType> {
      return this.botTypesService.getBotTypeById(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
      return this.botTypesService.deleteBotType(id);
  }

  @Patch('/:id')
  updateName(
    @Param('id') id: string,
    @Body() updateBotTypeDto: UpdateBotTypeDto,
  ): Promise<BotType> {
      return this.botTypesService.updateBotType(id, updateBotTypeDto);
  }

  @Post()
  async create(@Body() createBotTypeDto: CreateBotTypeDto): Promise<BotType> {
      return this.botTypesService.createBotType(createBotTypeDto);
  }
}
