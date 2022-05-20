import { getRepository, Repository } from 'typeorm'
import deviceEntity from '../entities/deviceEntity'
import { validate } from "class-validator";
import isDeviceModeValid from '../entities/validators/isDeviceModeValid';
import { dataSource } from '../services/dbConnection';

class DeviceDb {

    public async createNewDevice(name: string) {
        const deviceRepo:Repository<deviceEntity> = dataSource.getRepository(deviceEntity)

        // Create a new Device row using only name
        const device = deviceRepo.create({ name: name })

        // Persists the data in the database.
        await deviceRepo.save(device)

        return device
    }

    public async getDeviceInfo(id: string) {
        const deviceRepo:Repository<deviceEntity> = dataSource.getRepository(deviceEntity)

        // Find a row based on the device_id given in the header.
        const device = await deviceRepo.findOneBy({ id: id })
        
        // If no device found
        if (!device) throw new Error('Device not found')
        
        return device
    }

    public async updateDeviceinfo(id: string, mode: number|undefined, red: number|undefined, 
                green: number|undefined, blue: number|undefined, brightness: number|undefined) {
        const deviceRepo:Repository<deviceEntity> = dataSource.getRepository(deviceEntity)

        // Find a row based on the device_id given in the header.
        const device = await deviceRepo.findOneBy({ id: id })
    
        // If no device found
        if (!device) throw new Error('Device not found')

        // Check if mode is correct
        if (mode != undefined && !isDeviceModeValid(mode)) throw new Error("Mode is invalid.")
    
        // Update the row for the following columns: red, green, blue, mode, brightness
        var updatedDevice = device
        if (mode != undefined)
            updatedDevice = await deviceRepo.merge(device, {'mode': mode})
        if (red != undefined)
            updatedDevice = await deviceRepo.merge(device, {'red': red})
        if (green != undefined)
            updatedDevice = await deviceRepo.merge(device, {'green': green})
        if (blue != undefined)
            updatedDevice = await deviceRepo.merge(device, {'blue': blue})
        if (brightness != undefined)
            updatedDevice = await deviceRepo.merge(device, {'brightness': brightness})
    
        // Validate device
        const errors = await validate(updatedDevice)
        if (errors.length > 0) {
            throw new Error(`Validation failed!`);
        } else {
            deviceRepo.save(updatedDevice)
        }

        return updatedDevice
    }

}

export default new DeviceDb()