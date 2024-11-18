import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BotType } from "./bot-types.entity";
import { UpdateBotTypeDto } from "./dto/update-bot-type.dto";
import { CreateBotTypeDto } from "./dto/create-bot-type.dto";
import { ErrorCodes } from "../Utils/Errors/errors-constaints.enum";

@Injectable()
export class BotTypesService {
    constructor(
    @InjectRepository(BotType)
    private readonly botTypeRepository: Repository<BotType>,
    ) {}

    async getAll(): Promise<BotType[]> {
        return this.botTypeRepository.find();
    }

    async getBotTypeById(id: string): Promise<BotType> {
        const botType = await this.botTypeRepository.findOneBy({ id });

        // TODO Поставить проверку на уровень выше
        if (!botType) throw new NotFoundException();
        return botType;
    }

    async deleteBotType(id: string): Promise<void> {
        const result = await this.botTypeRepository.delete({ id });

        if (!result.affected) {
            throw new NotFoundException(`Soil Type with ID ${id} not found`);
        }
    }

    async updateBotType(
        id: string,
        updateBotTypeDto: UpdateBotTypeDto,
    ): Promise<BotType> {
        const botType = await this.getBotTypeById(id);
        const { name } = updateBotTypeDto;

        botType.name = name;

        await this.botTypeRepository.save(botType);
        return botType;
    }

    async createBotType(
        createBotTypeDto: CreateBotTypeDto,
    ): Promise<BotType> {
        const botType = this.botTypeRepository.create(createBotTypeDto);

        try {
            return await this.botTypeRepository.save(botType);
        } catch (e) {
            if (e.code === ErrorCodes.UNIQUE_ERROR_CODE) {
                throw new ConflictException('Type already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }

    }
}
