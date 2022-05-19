import * as Koa from 'koa'

class WakeupController {

    public async serverAliveResponse(ctx:Koa.Context) {
        // Simple response to show server is alive
        ctx.body = {
            data: 'Hello World',
        }
    }

}

export default new WakeupController()