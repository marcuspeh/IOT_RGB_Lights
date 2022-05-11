import * as Koa from 'koa';
import * as Router from 'koa-router';
import { getRepository, Repository } from 'typeorm';
import deviceEntity from '../entity/device.entity';
import * as HttpStatus from 'http-status-codes';

const routerOpts: Router.IRouterOptions = {
  prefix: '/api/device',
};

const router: Router = new Router(routerOpts);

// POST /api/device/:device_id
router.post('/', async (ctx:Koa.Context) => {
  const deviceRepo:Repository<deviceEntity> = getRepository(deviceEntity);

  const device = deviceRepo.create(ctx.request.body);

  await deviceRepo.save(device);

  ctx.status = HttpStatus.CREATED;
  ctx.body = {
    data: { device },
  };
});

// GET /api/device/:device_id
router.get('/:device_id', async (ctx:Koa.Context) => {
  const deviceRepo:Repository<deviceEntity> = getRepository(deviceEntity);

  const device = await deviceRepo.findOneBy({
    id: ctx.params.device_id
  });

  if (!device) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  ctx.body = {
    data: { device },
  };
});

// PATCH /api/device/:device_id
router.patch('/:device_id', async (ctx:Koa.Context) => {
  const deviceRepo:Repository<deviceEntity> = getRepository(deviceEntity);

  const device = await deviceRepo.findOneBy({
    id: ctx.params.device_id
  });

  if (!device) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  const updateddevice = await deviceRepo.merge(device, ctx.request.body);

  deviceRepo.save(updateddevice);

  ctx.body = {
    data: { device: updateddevice },
  };
});

export default router;