import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn, Unique
} from "typeorm";
import { User } from '../users/user.entity';

@Entity()
@Unique(['userId', 'code'])
export class Device {
  @PrimaryGeneratedColumn('uuid')
      id: string;  // Уникальный идентификатор бота

  @Column({ type: 'varchar', length: 255 })
      name: string;  // Имя прибора который видит пользователь

  @Column({ type: 'varchar', length: 255 })
      code: string;  // Уникальный код, для каждого девайса

  @ManyToOne(() => User, (user) => user.devices, { nullable: true })
  @JoinColumn({ name: 'userId' })  // Это внешний ключ для связи с пользователем
      user: User;

  @Column({nullable: true})
      userId: string;  // Внешний ключ, связывающий с User
}
