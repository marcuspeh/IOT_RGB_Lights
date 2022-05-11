import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum deviceMode {
  OFF = 0,
  NORMAL_LIGHT = 1,
  SOUND_REACTIVE = 2,
  FADE = 3
}

@Entity()
export default class Device {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column("varchar", { length: 255 })
  name: string;

  @Column({ type: 'enum', enum: deviceMode, default: deviceMode.OFF })
  mode: deviceMode;

  @Column({ type: 'int', default: 0 }) // Need to restrict to 0 - 255
  red: number;

  @Column({ type: 'int', default: 0 }) // Need to restrict to 0 - 255
  green: number;

  @Column({ type: 'int', default: 0 }) // Need to restrict to 0 - 255
  blue: number;

}