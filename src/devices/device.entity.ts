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
      id: string;  // Унікальний ідентифікатор пристрою

  @Column({ type: 'varchar', length: 255 })
      name: string;  // Ім'я пристрою, який бачить користувач

  @Column({ type: 'varchar', length: 255, unique: true })
      code: string;  // Унікальний код, для кожного девайсу свій

  @ManyToOne(() => User, (user) => user.devices, { nullable: true })
  @JoinColumn({ name: 'userId' })  // Зовнішній ключ для звяки з користувачем
      user: User;

  @Column({nullable: true})
      userId: string;  // Зовнішній ключ, зв'язуючий з User

  @OneToMany(() => SoilIndicators, (soilIndicator) => soilIndicator.device)
      soilIndicators: SoilIndicators[];
}
