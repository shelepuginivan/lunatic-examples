import { bodyParser, LunaticServer, serveStatic } from '@shelepuginivan/lunatic';
import { config } from 'dotenv';
import { nanoid } from 'nanoid';
import { join } from 'path';
import { render } from 'pug';
import { createClient } from 'redis';

const app = new LunaticServer();
const redisClient = createClient();

config({
	path: join(__dirname, '..', '.env')
});

app
	.use(bodyParser)
	.renderer(render)
	.get('/', (_req, res) => res.renderFile(join(__dirname, '..', 'views', 'index.pug')))
	.get('/:id', async (req, res, next) => {
		const id = req.params.id;

		if (typeof id !== 'string') {
			return await res.status(400).json({ message: 'id невалидный' });
		}

		const originalUrl = await redisClient.get(id as any);

		if (!originalUrl) {
			return next();
		}

		await res.status(302).redirect(originalUrl);
	})
	.post('/', async (req, res) => {
		const url = (req.body as Record<'url', string>).url;
		let id = nanoid(7);

		while (await redisClient.get(id as any)) {
			id = nanoid(7);
		}

		await redisClient.set(id as any, url as any);

		const shortUrl = `${process.env.HOST}/${id}`;
		await res.status(200).json({ url: shortUrl });
	})
	.use('/', serveStatic(join(__dirname, '..', 'static')));

const start = async () => {
	await redisClient.connect();
	console.log('Redis successfully connected');

	const port = Number(process.env.PORT) || 8000;

	app.listen(port);
	console.log(`Server started on port ${port}...`);
};

start().catch(console.error);
