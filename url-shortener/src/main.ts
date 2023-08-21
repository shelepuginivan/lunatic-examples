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

const HOST = process.env.HOST || 'http://localhost:8000'
const PORT = Number(process.env.PORT) || 8000

app
	.renderer(render)
	.use(bodyParser)
	.use('/static', serveStatic(join(__dirname, '..', 'static')))
	.get('/', (_req, res) => res.renderFile(join(__dirname, '..', 'views', 'index.pug')))
	.get('/:id', async (req, res) => {
		const id = req.params.id;

		if (typeof id !== 'string') {
			return await res.status(400).json({ message: 'invalid id' });
		}

		const originalUrl = await redisClient.get(id);

		if (!originalUrl) {
			return await res.status(404).json({ message: 'link not found' })
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

			const shortUrl = `${HOST}/${id}`;
			await res.status(200).json({ url: shortUrl });
		} catch (error) {
			if (error instanceof ZodError) {
				await res.status(400).json({ message: 'URL is not valid' });
			}
		}
	})

const start = async () => {
	await redisClient.connect();
	console.log('Redis successfully connected');

	app.listen(PORT);
	console.log(`Server started on port ${PORT}...`);
};

start().catch(console.error);
