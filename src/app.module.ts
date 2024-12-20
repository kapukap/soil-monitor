import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SoilTypesModule } from './soil-types/soil-types.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { UsersRolesModule } from './users-roles/users-roles.module';
import { BotTypesModule } from './bot-types/bot-types.module';
import { BotsModule } from './bots/bots.module';
import { DevicesModule } from './devices/devices.module';
import { SoilIndicatorsModule } from './soil-indicators/soil-indicators.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: +configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                entities: [__dirname + '/**/*.entity.{js,ts}'],
                synchronize: true,
            }),
        }),
        SoilIndicatorsModule,
        SoilTypesModule,
        AuthModule,
        UsersModule,
        RolesModule,
        UsersRolesModule,
        BotTypesModule,
        BotsModule,
        DevicesModule
    ],
})
export class AppModule {}
