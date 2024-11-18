// src/bots/bot.entity.ts
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn, Unique
} from "typeorm";
import { BotType } from '../bot-types/bot-types.entity';
import { User } from '../users/user.entity';

@Entity()
@Unique(['userId', 'botTypeId'])
export class Bot {
  @PrimaryGeneratedColumn('uuid')
      id: string;  // Уникальный идентификатор бота

  @Column({ type: 'varchar', length: 255 })
      code: string;  // Код бота (например, токен)

  @Column({ type: 'varchar', length: 255, nullable: true })
      messengerId: string;  // Идентификатор бота в мессенджере (например, username в Telegram)

  @ManyToOne(() => BotType, (botType) => botType.bots)
  @JoinColumn({ name: 'botTypeId' })  // Указываем внешний ключ для связи с BotType
      botType: BotType;  // Связь с типом бота

  @Column()
      botTypeId: string;  // Внешний ключ, связывающий с BotType

  @ManyToOne(() => User, (user) => user.bots)
  @JoinColumn({ name: 'userId' })  // Указываем внешний ключ для связи с User
      user: User;  // Связь с пользователем

  @Column()
      userId: string;  // Внешний ключ, связывающий с User
}
