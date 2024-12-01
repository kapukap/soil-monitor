import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { SoilType } from '../soil-types/soil-types.entity';
import { Device } from '../devices/device.entity';

@Entity()
export class SoilIndicators {
  @PrimaryGeneratedColumn('uuid')
      id: string;

  @Column('float')
      moisture: number; // Волога

  @Column('float')
      temperature: number; // Температура

  @Column('float')
      acidity: number; // Кислотність pH

  @Column('float')
      electricalConductivity: number; // Електропровідність = Солоність

  @Column('text')
      nitrogen: string; // Азот N

  @Column('text')
      phosphorus: string; // Фосфор P

  @Column('text')
      potassium: string; // Калій K

  @Column('text', { nullable: false })
      deviceCode: string; // Зберігаємо код, який прийшов

  @ManyToOne(() => SoilType, (soilType) => soilType.soilIndicators)
  @JoinColumn({ name: 'soilTypeId' })
      soilType: SoilType;

  @Column()
      soilTypeId: string; // Зовнішній ключ, який зв'язує з SoilType

  @ManyToOne(() => Device, (device) => device.soilIndicators, {
      nullable: true,
  })
  @JoinColumn({ name: 'deviceId' })
      device: Device;

  @Column({ nullable: true })
      deviceId: string; // Зовнішній ключ, який зв'язує з Device

  // Дата та час створення запису
  @CreateDateColumn({ type: 'timestamptz' })
      createdAt: Date;

  // Дата та час останнього оновлення запису
  @UpdateDateColumn({ type: 'timestamptz' })
      updatedAt: Date;
}
