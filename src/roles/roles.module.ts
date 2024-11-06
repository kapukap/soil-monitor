import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { AuthModule } from '../auth/auth.module';
import { Role } from './role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AuthModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
