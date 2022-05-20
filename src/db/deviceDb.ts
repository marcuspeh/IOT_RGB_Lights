import { getRepository, Repository } from 'typeorm'
import deviceEntity from '../entities/deviceEntity'
import isDeviceModeValid from './utils/isDeviceModeValid'
import isColorValid from './utils/isColorValid'

class DeviceDb {

    public async createNewDevice(name: string) {
        const deviceRepo:Repository<deviceEntity> = getRepository(deviceEntity)

        // Create a new Device row using only name
        const device = deviceRepo.create({ name: name })

        // Persists the data in the database.
        await deviceRepo.save(device)

        return device
    }

    public async getDeviceInfo(id: string) {
        const deviceRepo:Repository<deviceEntity> = getRepository(deviceEntity)

        // Find a row based on the device_id given in the header.
        const device = await deviceRepo.findOneBy({ id: id })
        
        // If no device found
        if (!device) throw new Error('Device not found')
        
        return device
    }

    public async updateDeviceinfo(id: string, mode: number|undefined, red: number|undefined, 
                green: number|undefined, blue: number|undefined, brightness: number|undefined) {
        const deviceRepo:Repository<deviceEntity> = getRepository(deviceEntity)

        // Find a row based on the device_id given in the header.
        const device = await deviceRepo.findOneBy({ id: id })
    
        // If no device found
        if (!device) throw new Error('Device not found')
    
        // Check if mode is correct
        if (mode != undefined && !isDeviceModeValid(mode)) throw new Error("Mode is invalid. Must be between 0 to 2 (inclusive).")
    
        // Check if color is correct
        if (red != undefined && !isColorValid(red)) throw new Error("Red is invalid. Must be between 0 to 255 (inclusive).")
        if (green != undefined && !isColorValid(green)) throw new Error("Green is invalid. Must be between 0 to 255 (inclusive).")
        if (blue != undefined && !isColorValid(blue)) throw new Error("Blue is invalid. Must be between 0 to 255 (inclusive).")
        
        // Check if bightness is correct
        if (brightness != undefined && !isColorValid(brightness)) throw new Error("Brightness is invalid. Must be between 0 to 255 (inclusive).")
    
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
    
        // Persists the data in the database.
        deviceRepo.save(updatedDevice)

        return updatedDevice
    }

}

export default new DeviceDb()