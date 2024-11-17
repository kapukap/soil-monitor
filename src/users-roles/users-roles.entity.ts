import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Role } from '../roles/role.entity';

@Entity('user_role')
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
      id: string;

  @ManyToOne(() => User, (user) => user.roles, { eager: true })
  @JoinColumn({ name: 'user_id' })
      user: User;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
      role: Role;
}
