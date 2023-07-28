import { bodyParser, LunaticServer, serveStatic } from '@shelepuginivan/lunatic';
import { config } from 'dotenv';
import { nanoid } from 'nanoid';
import { join } from 'path';
import { render } from 'pug';
import { createClient } from 'redis';
import { ZodError } from 'zod';

import { urlCreationSchema } from './schemas';

const app = new LunaticServer();
const redisClient = createClient();

config({
	path: join(__dirname, '..', '.env')
});

app
	.renderer(render)
	.use(bodyParser)
	.get('/', (_req, res) => res.renderFile(join(__dirname, '..', 'views', 'index.pug')))
	.get('/:id', async (req, res, next) => {
		const id = req.params.id;

		if (typeof id !== 'string') {
			return await res.status(400).json({ message: 'id невалидный' });
		}

		const originalUrl = await redisClient.get(id);

		if (!originalUrl) {
			return next();
		}

		await res.status(302).redirect(originalUrl);
	})
	.post('/', async (req, res) => {
		try {
			const { url } = urlCreationSchema.parse(req.body);

			let id = nanoid(7);

			while (await redisClient.get(id)) {
				id = nanoid(7);
			}

			await redisClient.set(id, url);

			const shortUrl = `${process.env.HOST}/${id}`;
			await res.status(200).json({ url: shortUrl });
		} catch (error) {
			if (error instanceof ZodError) {
				await res.status(400).json({ message: 'URL is not valid' });
			}
		}

	})
	.use('/', serveStatic(join(__dirname, '..', 'static')));

const start = async () => {
	const port = Number(process.env.PORT) || 8000;

	await redisClient.connect();
	console.log('Redis successfully connected');

	app.listen(port);
	console.log(`Server started on port ${port}...`);
};

start().catch(console.error);
