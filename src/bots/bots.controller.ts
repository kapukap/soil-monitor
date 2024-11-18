import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BotsService } from "./bots.service";
import { Bot } from "./bot.entity";
import { UpdateBotCodeDto } from "./dto/update-bot-code.dto";
import { CreateBotDto } from "./dto/create-bot.dto";

@Controller('bots')
export class BotsController {
    constructor(private readonly botsService: BotsService) {}
  @Get()
    async getAll(): Promise<Bot[]> {
        return this.botsService.getAll();
    }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Bot> {
      return this.botsService.getBotById(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
      return this.botsService.deleteBot(id);
  }

  @Patch('/:id')
  updateName(
    @Param('id') id: string,
    @Body() updateBotDto: UpdateBotCodeDto,
  ): Promise<Bot> {
      return this.botsService.updateBotCode(id, updateBotDto);
  }

  @Post()
  async create(@Body() createBotDto: CreateBotDto): Promise<Bot> {
      return this.botsService.createBot(createBotDto);
  }
}
