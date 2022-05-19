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
        
        return device
    }

    public async updateDeviceinfo(id: string, mode: number|undefined, red: number|undefined, green: number|undefined, blue: number|undefined, brightness: number|undefined) {
        const deviceRepo:Repository<deviceEntity> = getRepository(deviceEntity)

        // Find a row based on the device_id given in the header.
        const device = await deviceRepo.findOneBy({ id: id })
    
        // If no device found
        if (!device) return
    
        // Check if mode is correct
        if (mode != undefined && !isDeviceModeValid(mode)) return
    
        // Check if color is correct
        if (red != undefined && !isColorValid(red)) return
        if (green != undefined && !isColorValid(green)) return
        if (blue != undefined && !isColorValid(blue)) return
        
        // Check if bightness is correct
        if (brightness != undefined && !isColorValid(brightness)) return
    
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