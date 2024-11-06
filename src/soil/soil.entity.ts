import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Soil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  moisture: number;

  @Column('float')
  temperature: number;

  @Column('float')
  acidity: number;

  @Column('float')
  salinity: number;

  @Column('text')
  nutrients: string;
}
