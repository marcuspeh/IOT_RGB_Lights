import * as Koa from 'koa'
import * as HttpStatus from 'http-status-codes'

import deviceDb from '../db/deviceDb'

class DeviceController {

    public async createNewDevice(ctx:Koa.Context) {
        const device = await deviceDb.createNewDevice(ctx.request.body.name)

        ctx.status = HttpStatus.CREATED
        ctx.body = {
            data: { device },
        }
    }


    public async getDeviceInfo(ctx:Koa.Context) {
        const device = await deviceDb.getDeviceInfo(ctx.params.device_id)

        if (!device) {
            ctx.throw(HttpStatus.NOT_FOUND)
        }

        ctx.body = {
            data: { device },
        }
    }


    public async updateDeviceInfo(ctx:Koa.Context) {
        const device = await deviceDb.updateDeviceinfo(
                ctx.params.device_id, 
                ctx.request.body.mode,
                ctx.request.body.red,
                ctx.request.body.green,
                ctx.request.body.blue,
                ctx.request.body.brightness
        )

        if (!device) {
            ctx.throw(HttpStatus.NOT_FOUND)
        }

        ctx.body = {
            data: { device: device },
        }
    }

}

export default new DeviceController()