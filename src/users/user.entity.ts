import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../roles/role.entity';
import { Bot } from '../bots/bot.entity';
import { Device } from '../device/device.entity';

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

  // Связь один ко многим с сущностью Bot (один пользователь может иметь несколько ботов, но для каждого типа мессенджера только один)
  @OneToMany(() => Bot, (bot) => bot.user)
      bots: Bot[];

  @OneToMany(() => Device, (device) => device.user)
      devices: Device[];
}
