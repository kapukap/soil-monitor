import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './users-roles.entity';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';

@Injectable()
export class UsersRolesService {
    constructor(
    @InjectRepository(UserRole)
    private readonly usersRolesRepository: Repository<UserRole>,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    ) {}

    async getAll(): Promise<UserRole[]> {
        return this.usersRolesRepository.find();
    }

    async createUserRole(createUserRoleDto: CreateUserRoleDto): Promise<any> {
        const { userId, roleId } = createUserRoleDto;

        const user = await this.usersService.getUserById(userId);

        const userHasRole = await this.findUserRole(userId);
        if (userHasRole) {
            throw new ConflictException(`User has role.`);
        }

        const role = await this.rolesService.getRoleById(roleId);

        const userRole = this.usersRolesRepository.create({ user, role });
        return this.usersRolesRepository.save(userRole);
    }

    // Remove a role from a user
    async removeRoleFromUser(userId: string): Promise<void> {
        const userRole = await this.usersRolesRepository.findOne({
            where: { user: { id: userId } },
        });

        if (!userRole) {
            throw new NotFoundException();
        }

        await this.usersRolesRepository.remove(userRole);
    }

    async getUserRole(userId: string): Promise<UserRole> {
        const userRole = await this.findUserRole(userId);

        if (!userRole) {
            throw new NotFoundException('');
        }
        return userRole;
    }

    // Get all roles for a user
    async findUserRole(userId: string): Promise<UserRole> {
        return await this.usersRolesRepository.findOne({
            where: { user: { id: userId } },
            relations: ['role'],
        });
    }

    async updateUserRole(userId: string, roleId: string): Promise<UserRole> {
        await this.usersService.getUserById(userId);
        const role = await this.rolesService.getRoleById(roleId);

        const userRole = await this.findUserRole(userId);
        if (!userRole) {
            throw new ConflictException(`User without role.`);
        }

        if (userRole.role.id === roleId) {
            throw new ConflictException(`User has this role.`);
        }

        userRole.role = role;

        try {
            await this.usersRolesRepository.save(userRole);
            return userRole;
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }

    // // Get all users with a specific role
    // async getUsersByRole(roleId: string): Promise<User[]> {
    //   const userRoles = await this.usersRolesRepository.find({
    //     where: { role: { id: roleId } },
    //     relations: ['user'],
    //   });
    //
    //   return userRoles.map((userRole) => userRole.user);
    // }
}
