import * as Router from 'koa-router'
import wakeupRoutes from './wakeupRoutes'
import deviceRoutes from './deviceRoutes'

const router = new Router()
router.prefix("/api")

// Set up routes
router.use("/", wakeupRoutes)
router.use("/device", deviceRoutes)

export default router