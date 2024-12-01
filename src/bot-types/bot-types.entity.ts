import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Bot } from '../bots/bot.entity'; // Імпортуємо сутність Bot, оскільки вона буде пов'язана

@Entity()
export class BotType {
  @PrimaryGeneratedColumn('uuid')
      id: string;  // Унікальний ідентифікатор типа боту (наприклад, WhatsApp, Viber та інші)

  @Column({ type: 'varchar', length: 255, unique: true })
      name: string;  // Назва самого месенджеру

  // Зв'язок із сутністю Bot (один тип бота може бути у багатьох ботів)
  @OneToMany(() => Bot, (bot: Bot) => bot.botType)
      bots: Bot[];
}
