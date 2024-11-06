import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../roles/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nick: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable() // TypeORM автоматически создаст промежуточную таблицу
  roles: Role[];
}
