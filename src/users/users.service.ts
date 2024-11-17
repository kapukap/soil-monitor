import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository, // private readonly roleRepository: Repository<Role>,
    ) {}

    async getAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async getUserById(id: string): Promise<User> {
        return this.usersRepository.getUserById(id);
    }

    async deleteUser(id: string): Promise<void> {
        const result = await this.usersRepository.delete({ id });

        if (!result.affected) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersRepository.updateUser(id, updateUserDto);
    }

    async createUser(createUserDto: CreateUserDto): Promise<void> {
        await this.usersRepository.createUser(createUserDto);
    }

    // // TODO Remove to repository?
    // // Добавление роли пользователю
    // async addRoleToUser(userId: string, roleId: string): Promise<User> {
    //   return this.usersRepository.addRoleToUser(userId, roleId);
    // }
}
