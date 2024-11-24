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
import { Role } from "../roles/role.entity";
import { RolesService } from "../roles/roles.service";

@Module({
    imports: [TypeOrmModule.forFeature([Bot, BotType, User, Role]), AuthModule],
    providers: [BotsService, BotTypesService, UsersService, UsersRepository, RolesService],
    controllers: [BotsController]
})
export class BotsModule {}
