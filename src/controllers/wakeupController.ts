import * as Koa from 'koa';
import * as Router from 'koa-router';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api',
  };
  
const router: Router = new Router(routerOpts);

// GET /api
router.get('/', async (ctx:Koa.Context) => {
    ctx.body = {
        data: 'Hello World',
    };
});

export default router;