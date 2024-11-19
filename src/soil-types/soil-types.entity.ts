import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';
import { SoilIndicators } from '../soil-indicators/soil-indicators.entity';

export type SoilTypeCodes = 'CHZ' | 'PZ' | 'SRZ' | 'LSG' | 'GRK' | 'TFG' | 'SLN' | 'LG';

@Entity()
export class SoilType {
  @PrimaryGeneratedColumn('uuid')
      id: string;

  @Column('text')
      name: string;

  @Column('text', {unique: true})
      code: SoilTypeCodes;

  @Column('text', { nullable: true })
      description: string | null;

  @OneToMany(() => SoilIndicators, (soilIndicator) => soilIndicator.soilType)
      soilIndicators: SoilIndicators[];
}
