import * as Koa from 'koa';
import * as Router from 'koa-router';
import { getRepository, Repository } from 'typeorm';
import deviceEntity from '../entity/device.entity';
import * as HttpStatus from 'http-status-codes';

const routerOpts: Router.IRouterOptions = {
  prefix: '/devices',
};

const router: Router = new Router(routerOpts);

router.get('/', async (ctx:Koa.Context) => {
  // Get the device repository from TypeORM.
  const deviceRepo:Repository<deviceEntity> = getRepository(deviceEntity);

  // Find the requested device.
  const devices = await deviceRepo.find();

  // Respond with our device data.
  ctx.body = {
    data: { devices },
  };
});

router.get('/:device_id', async (ctx:Koa.Context) => {
  // Get the device repository from TypeORM.
  const deviceRepo:Repository<deviceEntity> = getRepository(deviceEntity);

  // Find the requested device.
  const device = await deviceRepo.findOne(ctx.params.device_id);

  // If the device doesn't exist, then throw a 404.
  // This will be handled upstream by our custom error middleware.
  if (!device) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  // Respond with our device data.
  ctx.body = {
    data: { device },
  };
});

router.post('/', async (ctx:Koa.Context) => {
  // Get the device repository from TypeORM.
  const deviceRepo:Repository<deviceEntity> = getRepository(deviceEntity);

  // Create our new device.
  const device = deviceRepo.create(ctx.request.body);

  // Persist it to the database.
  await deviceRepo.save(device);

  // Set the status to 201.

  // Respond with our device data.ctx.status = HttpStatus.CREATED;
  ctx.body = {
    data: { device },
  };
});

router.delete('/:device_id', async (ctx:Koa.Context) => {
  // Get the device repository from TypeORM.
  const deviceRepo:Repository<deviceEntity> = getRepository(deviceEntity);

  // Find the requested device.
  const device = await deviceRepo.findOne(ctx.params.device_id);

  // If the device doesn't exist, then throw a 404.
  // This will be handled upstream by our custom error middleware.
  if (!device) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  // Delete our device.
  await deviceRepo.delete(device);

  // Respond with no data, but make sure we have a 204 response code.
  ctx.status = HttpStatus.NO_CONTENT;
});

router.patch('/:device_id', async (ctx:Koa.Context) => {
  // Get the device repository from TypeORM.
  const deviceRepo:Repository<deviceEntity> = getRepository(deviceEntity);

  // Find the requested device.
  const device:deviceEntity = await deviceRepo.findOne(ctx.params.device_id);

  // If the device doesn't exist, then throw a 404.
  // This will be handled upstream by our custom error middleware.
  if (!device) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  // Merge the existing device with the new data.
  // This allows for really simple partial (PATCH).
  const updateddevice = await deviceRepo.merge(device, ctx.request.body);

  // Save the new data.
  deviceRepo.save(updateddevice);


  // Respond with our device data.// Response with the updated content.
  ctx.body = {
    data: { device: updateddevice },
  };
});

export default router;