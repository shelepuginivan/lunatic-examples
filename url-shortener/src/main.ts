import { LunaticServer } from '@shelepuginivan/lunatic';
import { config } from 'dotenv';
import { join } from 'path';
import { render } from 'pug';

const app = new LunaticServer();

config({
	path: join(__dirname, '..', '.env')
});

app.renderer(render);
app.get('/', (_req, res) => res.renderFile(join(__dirname, '..', 'views', 'index.pug')));

const start = () => {
	const port = Number(process.env.PORT) || 8000;

	app.listen(port);
	console.log(`Server started on port ${port}...`);
};

start();
