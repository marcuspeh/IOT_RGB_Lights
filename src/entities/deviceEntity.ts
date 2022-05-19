import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import DeviceMode from '../models/deviceMode'

@Entity()
export default class Device {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column("varchar", { length: 255 })
    name: string

    @Column({ type: 'enum', enum: DeviceMode, default: DeviceMode.OFF })
    mode: DeviceMode

    @Column({ type: 'int', default: 0 }) // Need to restrict to 0 - 255
    red: number

    @Column({ type: 'int', default: 0 }) // Need to restrict to 0 - 255
    green: number

    @Column({ type: 'int', default: 0 }) // Need to restrict to 0 - 255
    blue: number

    @Column({ type: 'int', default: 0 }) // Need to restrict to 0 - 255
    brightness: number

    @Column({ type: 'timestamptz', default: () => 'NOW()', })
    date_created: Date
}