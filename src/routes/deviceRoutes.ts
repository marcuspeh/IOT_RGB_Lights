import * as Koa from 'koa'
import * as Router from 'koa-router'
import deviceController from '../controllers/deviceController'

const router: Router = new Router()

// POST /api/device/:device_id
router.post('/', async (ctx:Koa.Context) => deviceController.createNewDevice(ctx))

// GET /api/device/:device_id
router.get('/:device_id', async (ctx:Koa.Context) => deviceController.getDeviceInfo(ctx))

// PATCH /api/device/:device_id
router.patch('/:device_id', async (ctx:Koa.Context) => deviceController.updateDeviceInfo(ctx))

const deviceRoutes = router.routes()
export default deviceRoutes