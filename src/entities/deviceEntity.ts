import { IsInt, Max, Min, ValidateIf } from 'class-validator'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import DeviceMode from '../models/deviceMode'
import isDeviceModeValid from './validators/isDeviceModeValid'

@Entity()
export default class Device {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column("varchar", { length: 255 })
    name: string

    @ValidateIf(o => isDeviceModeValid(o))
    @Column({ type: 'enum', enum: DeviceMode, default: DeviceMode.OFF })
    mode: DeviceMode

    @Column({ type: 'int', default: 0 })
    @IsInt()
    @Min(0)
    @Max(255)
    red: number

    @Column({ type: 'int', default: 0 })
    @IsInt()
    @Min(0)
    @Max(255)
    green: number

    @Column({ type: 'int', default: 0 })
    @IsInt()
    @Min(0)
    @Max(255)
    blue: number

    @Column({ type: 'int', default: 0 })
    @IsInt()
    @Min(0)
    @Max(255)
    brightness: number

    @Column({ type: 'timestamptz', default: () => 'NOW()', })
    date_created: Date
}