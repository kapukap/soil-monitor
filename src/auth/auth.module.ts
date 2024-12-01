import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UsersRepository } from '../users/users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '../config/jwt.config';
import { JwtStrategy } from './jwt.strategy';
import { Role } from '../roles/role.entity';
import { RolesService } from '../roles/roles.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register(JwtConfig),
        TypeOrmModule.forFeature([User, Role]),
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersRepository, JwtStrategy, RolesService],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
