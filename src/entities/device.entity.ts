import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import DeviceMode from './deviceMode';

@Entity()
export default class Device {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column("varchar", { length: 255 })
  name: string;

  @Column({ type: 'enum', enum: DeviceMode, default: DeviceMode.OFF })
  mode: DeviceMode;

  @Column({ type: 'int', default: 0 }) // Need to restrict to 0 - 255
  red: number;

  @Column({ type: 'int', default: 0 }) // Need to restrict to 0 - 255
  green: number;

  @Column({ type: 'int', default: 0 }) // Need to restrict to 0 - 255
  blue: number;

}