import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from "../roles/role.entity";
import { RolesService } from "../roles/roles.service";
import { Device } from "../devices/device.entity";
import { RoleConstants } from '../roles/constants/role.constants';
import { UsersRolesService } from '../users-roles/users-roles.service';

@Injectable()
export class UsersService {
    constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository, // private readonly roleRepository: Repository<Role>,
    private readonly rolesService: RolesService, // private readonly roleRepository: Repository<Role>,
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

    async getUserRole(id: string): Promise<Partial<Role>> {
        const user = await this.usersRepository.getUserWithRoleById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!user.role) return {};

        return {
            id: user.role.id,
            name: user.role.name,
        };
    }


    async updateUserRole(id: string, roleId: string): Promise<Role> {
        const user = await this.usersRepository.getUserWithRoleById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const role = await this.rolesService.getRoleById(roleId);
        if (!role) {
            throw new NotFoundException('Role not found');
        }

        user.role = role;
        await this.usersRepository.save(user);
        return role;
    }

    async getUserDevices(id: string): Promise<Partial<Device[]>> {
        const user = await this.usersRepository.getUserWithDevicesById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!user.devices) return [];

        return user.devices;
    }
}
