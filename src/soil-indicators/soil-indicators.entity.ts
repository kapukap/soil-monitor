import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { SoilType } from '../soil-types/soil-types.entity';
import { Device } from '../device/device.entity';

@Entity()
export class SoilIndicators {
  @PrimaryGeneratedColumn('uuid')
      id: number;

  @Column('float')
      moisture: number; // Влага

  @Column('float')
      temperature: number; // Температура

  @Column('float')
      acidity: number; // Кислотность pH

  @Column('float')
      electricalConductivity: number; // Электропроводность = Соленость

  @Column('text')
      nitrogen: string; // Азот N

  @Column('text')
      phosphorus: string; // Фосфор P

  @Column('text')
      potassium: string; // Калий K

  @Column('text', {nullable: false})
      deviceCode: string; // Сохраняем код который пришел

  @ManyToOne(() => SoilType, (soilType) => soilType.soilIndicators)
  @JoinColumn({ name: 'soilTypeId' })
      soilType: SoilType;

  @Column()
      soilTypeId: string;  // Внешний ключ, связывающий с BotType

  @ManyToOne(() => Device, (device) => device.soilIndicators, { nullable: true })
  @JoinColumn({ name: 'deviceId' })
      device: Device;

  @Column({nullable: true})
      deviceId: string;  // Внешний ключ, связывающий с BotType

}
