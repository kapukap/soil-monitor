import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoilTypesController } from './soil-types.controller';
import { SoilTypesService } from './soil-types.service';
import { SoilType } from './soil-types.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([SoilType]), AuthModule],
  controllers: [SoilTypesController],
  providers: [SoilTypesService],
})
export class SoilTypesModule {}
