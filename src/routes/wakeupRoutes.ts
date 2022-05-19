import * as Koa from 'koa'
import * as Router from 'koa-router'
import wakeupContoller from '../controllers/wakeupController'
  
const router: Router = new Router()

// GET /api
router.get('/', async (ctx:Koa.Context) => await wakeupContoller.serverAliveResponse(ctx))

const wakeupRoutes = router.routes()
export default wakeupRoutes