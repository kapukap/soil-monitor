import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Bot } from '../bots/bot.entity'; // Импортируем сущность Bot, так как она будет связана

@Entity()
export class BotType {
  @PrimaryGeneratedColumn('uuid')
      id: string;  // Уникальный идентификатор типа бота (например, Telegram, Viber и т. д.)

  @Column({ type: 'varchar', length: 255, unique: true })
      name: string;  // Название мессенджера, например, "Telegram", "Viber"

  // Связь с сущностью Bot (один тип бота может быть у многих ботов)
  @OneToMany(() => Bot, (bot: Bot) => bot.botType)
      bots: Bot[];
}
