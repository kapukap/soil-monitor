import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from '../roles/role.entity';
import { Bot } from '../bots/bot.entity';
import { Device } from '../devices/device.entity';

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

  @ManyToOne(() => Role, (role) => role.users)
      role: Role;

  // Зв'язок один до багатьох із сутністю Bot (один користувач може мати кілька ботів, але для кожного типу месенджера лише один)
  @OneToMany(() => Bot, (bot) => bot.user)
      bots: Bot[];

  @OneToMany(() => Device, (device) => device.user)
      devices: Device[];
}
