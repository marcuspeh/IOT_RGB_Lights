import * as Koa from 'koa';
import * as Router from 'koa-router';
import { getRepository, Repository } from 'typeorm';
import deviceEntity from '../entities/device.entity';
import isDeviceModeValid from '../entities/validators/isDeviceModeValid';
import isColorValid from '../entities/validators/isColorValid';
import * as HttpStatus from 'http-status-codes';

const routerOpts: Router.IRouterOptions = {
  prefix: '/api/device',
};

const router: Router = new Router(routerOpts);

// POST /api/device/:device_id
router.post('/', async (ctx:Koa.Context) => {
  const deviceRepo:Repository<deviceEntity> = getRepository(deviceEntity);

  // Create a new Device row using only the name supplied.
  // The other columns in the row will be the default value.
  const device = deviceRepo.create({name: ctx.request.body.name});

  // Persists the data in the database.
  await deviceRepo.save(device);

  ctx.status = HttpStatus.CREATED;
  ctx.body = {
    data: { device },
  };
});

// GET /api/device/:device_id
router.get('/:device_id', async (ctx:Koa.Context) => {
  const deviceRepo:Repository<deviceEntity> = getRepository(deviceEntity);

  // Find a row based on the device_id given in the header.
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

  // Find a row based on the device_id given in the header.
  const device = await deviceRepo.findOneBy({
    id: ctx.params.device_id
  });

  if (!device) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  // Check if mode is correct
  if (!isDeviceModeValid(ctx.request.body.mode)) {
    ctx.throw(HttpStatus.BAD_REQUEST);
  } 

  // Check if color range is correct
  if (!isColorValid(ctx.request.body.red)) {
    ctx.throw(HttpStatus.BAD_REQUEST);
  }
  if (!isColorValid(ctx.request.body.green)) {
    ctx.throw(HttpStatus.BAD_REQUEST);
  }
  if (!isColorValid(ctx.request.body.blue)) {
    ctx.throw(HttpStatus.BAD_REQUEST);
  }

  // Update the row for the following columns: red, green, blue, mode
  var updatedDevice = device;
  if (ctx.request.body.mode)
    updatedDevice = await deviceRepo.merge(device, {'mode': ctx.request.body.mode});
  if (ctx.request.body.red)
    updatedDevice = await deviceRepo.merge(device, {'red': ctx.request.body.red});
  if (ctx.request.body.green)
    updatedDevice = await deviceRepo.merge(device, {'green': ctx.request.body.green});
  if (ctx.request.body.blue)
    updatedDevice = await deviceRepo.merge(device, {'blue': ctx.request.body.blue});

  // Persists the data in the database.
  deviceRepo.save(updatedDevice);

  ctx.body = {
    data: { device: updatedDevice },
  };
});

export default router;