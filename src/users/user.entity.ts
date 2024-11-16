import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../roles/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  nick: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { nullable: true })
  firstName?: string | null;

  @Column('text', { nullable: true })
  middleName?: string | null;

  @Column('text', { nullable: true })
  lastName?: string | null;

  @Column('text')
  password: string;

  @OneToMany(() => Role, (role) => role.users)
  roles: Role[];
}
