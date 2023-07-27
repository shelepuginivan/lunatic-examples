import { bodyParser, LunaticServer, serveStatic } from '@shelepuginivan/lunatic';
import { config } from 'dotenv';
import { join } from 'path';
import { render } from 'pug';
import { nanoid } from 'nanoid';

const app = new LunaticServer();

config({
	path: join(__dirname, '..', '.env')
});

const mockDb = new Map<string, string>()

app
	.use(bodyParser)
	.renderer(render)
	.get('/', (_req, res) => res.renderFile(join(__dirname, '..', 'views', 'index.pug')))
	.get('/:id', async (req, res, next) => {
		const id = req.params.id as string;
		const originalUrl = mockDb.get(id);

		if (!originalUrl) {
			return next();
		}

		await res.status(302).redirect(originalUrl);
	})
	.post('/', async (req, res) => {
		const url = (req.body as Record<'url', string>).url;
		const id = nanoid(7);

		mockDb.set(id, url);

		const shortUrl = `${process.env.HOST}/${id}`
		await res.status(200).json({ url: shortUrl });
	})
	.use('/', serveStatic(join(__dirname, '..', 'static'), {
		index: false
	}))

const start = () => {
	const port = Number(process.env.PORT) || 8000;

	app.listen(port);
	console.log(`Server started on port ${port}...`);
};

start();
