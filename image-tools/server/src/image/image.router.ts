import { Router } from '@shelepuginivan/lunatic';

import { imageController } from './image.module';

const imageRouter = new Router();

imageRouter.post(
	'/compress',
	(req, res) => imageController.compressImage(req, res)
);

imageRouter.post(
	'/convert',
	(req, res) => imageController.convertImage(req, res)
);

export { imageRouter };
