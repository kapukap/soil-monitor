import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
