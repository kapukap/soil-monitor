import {
    Column,
    Entity,
    JoinColumn, ManyToMany,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import { User } from '../users/user.entity';
import { SoilIndicators } from '../soil-indicators/soil-indicators.entity';

@Entity()
@Unique(['userId', 'code'])
export class Device {
  @PrimaryGeneratedColumn('uuid')
      id: string;  // Уникальный идентификатор бота

  @Column({ type: 'varchar', length: 255 })
      name: string;  // Имя прибора который видит пользователь

  @Column({ type: 'varchar', length: 255, unique: true })
      code: string;  // Уникальный код, для каждого девайса

  @ManyToOne(() => User, (user) => user.devices, { nullable: true })
  @JoinColumn({ name: 'userId' })  // Это внешний ключ для связи с пользователем
      user: User;

  @Column({nullable: true})
      userId: string;  // Внешний ключ, связывающий с User

  @OneToMany(() => SoilIndicators, (soilIndicator) => soilIndicator.device)
      soilIndicators: SoilIndicators[];
}
