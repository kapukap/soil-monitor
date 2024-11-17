import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SoilType {
  @PrimaryGeneratedColumn('uuid')
      id: string;

  @Column('text')
      name: string;

  @Column('text', { nullable: true })
      description: string | null;
}
