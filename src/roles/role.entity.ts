import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
      id: string;

  @Column('text', { unique: true })
      name: string;

  @OneToMany(() => User, (user) => user.roles)
      users: User[];
}
