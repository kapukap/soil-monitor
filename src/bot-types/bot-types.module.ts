import { Module } from '@nestjs/common';
import { BotTypesService } from './bot-types.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { BotType } from "./bot-types.entity";
import { BotTypesController } from './bot-types.controller';

@Module({
    imports: [TypeOrmModule.forFeature([BotType]), AuthModule],
    providers: [BotTypesService],
    controllers: [BotTypesController]
})
export class BotTypesModule {}
