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
      id: string;  // Унікальний ідентифікатор бота

  @Column({ type: 'varchar', length: 255 })
      code: string;  // Код бота (наприклад, токен)

  @Column({ type: 'varchar', length: 255, nullable: true })
      messengerId: string;  // Ідентифікатор бота в месенджері (наприклад, username в Telegram)

  @ManyToOne(() => BotType, (botType) => botType.bots)
  @JoinColumn({ name: 'botTypeId' }) // Вказується зовнішній ключ для зв'язку з BotType
      botType: BotType; // Зв'язок із типом бота

  @Column()
      botTypeId: string; // Зовнішній ключ, що пов'язує з BotType

  @ManyToOne(() => User, (user) => user.bots)
  @JoinColumn({ name: 'userId' }) // Вказується зовнішній ключ для зв'язку з User
      user: User; // Зв'язок із користувачем

  @Column()
      userId: string; // Зовнішній ключ, який зв'язує з User
}
