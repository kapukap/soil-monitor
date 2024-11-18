import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Bot } from "./bot.entity";
import { UpdateBotCodeDto } from "./dto/update-bot-code.dto";
import { CreateBotDto } from "./dto/create-bot.dto";
import { BotTypesService } from "../bot-types/bot-types.service";
import { UsersService } from "../users/users.service";
import { ErrorCodes } from "../Utils/Errors/errors-constaints.enum";

@Injectable()
export class BotsService {
    constructor(
    @InjectRepository(Bot)
    private readonly botRepository: Repository<Bot>,
    private readonly botTypesService: BotTypesService,
    private readonly usersService: UsersService,
    ) {}

    async getAll(): Promise<Bot[]> {
        return this.botRepository.find();
    }

    async getBotById(id: string): Promise<Bot> {
        const bot = await this.botRepository.findOneBy({ id });

        if (!bot) throw new NotFoundException();
        return bot;
    }

    async deleteBot(id: string): Promise<void> {
        const result = await this.botRepository.delete({ id });

        if (!result.affected) {
            throw new NotFoundException(`Bot with ID ${id} not found`);
        }
    }

    async updateBotCode(
        id: string,
        updateBotDto: UpdateBotCodeDto,
    ): Promise<Bot> {
        const bot = await this.getBotById(id);
        const { code } = updateBotDto;

        bot.code = code;

        await this.botRepository.save(bot);
        return bot;
    }

    async updateBotMessengerId(
        id: string,
        messengerId: string,
    ): Promise<Bot> {
        const bot = await this.getBotById(id);

        bot.messengerId = messengerId;

        await this.botRepository.save(bot);
        return bot;
    }

    async createBot(
        createBotDto: CreateBotDto,
    ): Promise<Bot> {
        const {botTypeId, userId} = createBotDto;
        // Если не найдет тип, выдаст ошибку
        try {
            await this.botTypesService.getBotTypeById(botTypeId);
            await this.usersService.getUserById(userId);
        }   catch (e) {
            throw new NotFoundException();
        }


        const bot = this.botRepository.create(createBotDto);
        // Code Generator
        bot.code = Date.now().toString(36);


        try {
            return await this.botRepository.save(bot);
        }   catch (e) {
            switch (e.code) {
                case ErrorCodes.UNIQUE_ERROR_CODE:
                    throw new ConflictException('Bot with this data has already exists');
                case ErrorCodes.NOT_NULL_ERROR_CODE:
                    throw new ConflictException('Fill Required values');
                default:
                    throw new InternalServerErrorException();
            }
        }

    }
}
