import { Router } from '@shelepuginivan/lunatic';

import { apiController } from './api.module';

const apiRouter = new Router();

apiRouter.get(
	'/html',
	(req, res) => apiController.html(req, res)
);

apiRouter.get(
	'/image',
	(req, res) => apiController.image(req, res)
);

apiRouter.get(
	'/json',
	(req, res) => apiController.json(req, res)
);

apiRouter.get(
	'/svg',
	(req, res) => apiController.svg(req, res)
);

apiRouter.get(
	'/text',
	(req, res) => apiController.text(req, res)
);

apiRouter.get(
	'/xml',
	(req, res) => apiController.xml(req, res)
);

export { apiRouter };

