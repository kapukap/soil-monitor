import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoilController } from './soil.controller';
import { SoilService } from './soil.service';
import { Soil } from './soil.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Soil]), AuthModule],
  controllers: [SoilController],
  providers: [SoilService],
})
export class SoilModule {}
