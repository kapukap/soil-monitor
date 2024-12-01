import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { ErrorCodes } from '../Utils/Errors/errors-constaints.enum';

@Injectable()
export class RolesService {
    constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    ) {}

    async getAll(): Promise<Role[]> {
        return this.roleRepository.find();
    }

    async getRoleById(id: string): Promise<Role> {
        const role = await this.roleRepository.findOneBy({ id });

        if (!role) throw new NotFoundException();
        return role;
    }

    async getRoleByName(name: string): Promise<Role> {
        return await this.roleRepository.findOneBy({ name });
    }

    async deleteRole(id: string): Promise<void> {
        const result = await this.roleRepository.delete({ id });

        if (!result.affected) {
            throw new NotFoundException(`Soil Type with ID ${id} not found`);
        }
    }

    async updateRole(id: string, name: string): Promise<Role> {
        const role = await this.getRoleById(id);
        role.name = name;
        await this.roleRepository.save(role);
        return role;
    }

    async createRole(name: string): Promise<Role> {
        const role = this.roleRepository.create({ name });

        try {
            return await this.roleRepository.save(role);
        } catch (e) {
            switch (e.code) {
                case ErrorCodes.UNIQUE_ERROR_CODE:
                    throw new ConflictException('This Role has been already exists');
                default:
                    throw new InternalServerErrorException();
            }
        }
    }
}
