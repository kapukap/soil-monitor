import { Module } from '@nestjs/common';
import { BotsService } from './bots.service';
import { BotsController } from './bots.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { Bot } from "./bot.entity";
import { BotTypesService } from "../bot-types/bot-types.service";
import { UsersService } from "../users/users.service";
import { BotType } from "../bot-types/bot-types.entity";
import { User } from "../users/user.entity";
import { UsersRepository } from "../users/users.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Bot, BotType, User]), AuthModule],
    providers: [BotsService, BotTypesService, UsersService, UsersRepository],
    controllers: [BotsController]
})
export class BotsModule {}
