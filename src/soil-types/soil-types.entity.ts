import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SoilType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;
}
