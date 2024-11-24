import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { ErrorCodes } from '../Utils/Errors/errors-constaints.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    ) {
        super(usersRepository.target, usersRepository.manager);
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { nick, email, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashPass = await bcrypt.hash(password, salt);
        const user = this.create({ nick, password: hashPass, email });
        try {
            await this.save(user);
        } catch (e) {
            switch (e.code) {
                case ErrorCodes.UNIQUE_ERROR_CODE:
                    throw new ConflictException('User with this data has already exists');
                case ErrorCodes.NOT_NULL_ERROR_CODE:
                    throw new ConflictException('Fill Required values');
                default:
                    throw new InternalServerErrorException();
            }
        }
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });

        if (!user) throw new NotFoundException();
        return user;
    }

    async getUserWithRoleById(id: string): Promise<User> {
        return await this.usersRepository.findOne({
            where: { id },
            relations: ['role'],
        });
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.getUserById(id);
        const updateFields = Object.keys(updateUserDto);

        updateFields.forEach((field) => {
            user[field] = updateUserDto[field];
        });

        try {
            await this.save(user);
            return user;
        } catch (e) {
            if (e.code === ErrorCodes.UNIQUE_ERROR_CODE) {
                throw new ConflictException('Nick or Email already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    // Добавить роль пользователю
    // async addRoleToUser(userId: string, roleId: string): Promise<User> {
    //   const user = await this.findOne({
    //     where: { id: userId },
    //     relations: ['roles'],
    //   });
    //   if (!user) {
    //     throw new Error(`User with ID ${userId} not found`);
    //   }
    //
    //   // Правильный поиск роли с использованием where
    //   const role = await this.manager
    //     .getRepository(Role)
    //     .findOne({ where: { id: roleId } });
    //   if (!role) {
    //     throw new Error(`Role with ID ${roleId} not found`);
    //   }
    //
    //   // Добавление роли пользователю, если она ещё не добавлена
    //   if (!user.roles.some((existingRole) => existingRole.id === role.id)) {
    //     user.roles.push(role);
    //   }
    //
    //   return this.save(user);
    // }
}
