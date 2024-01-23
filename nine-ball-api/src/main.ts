import { cookieParser, LunaticServer } from '@shelepuginivan/lunatic';

import { apiRouter } from './api/api.router';

const app = new LunaticServer();

app.use(cookieParser);
app.use('/api/*', (req, res, next) => {
	if (req.cookies?.exceeded) {
		return res.status(403).json({
			message: 'You cannot ask Cirno a question more than once every 9 minutes.'
		});
	}

	res.setCookie('exceeded', 'true', { httpOnly: true, maxAge: 9 * 60 });
	return next();
});
app.use('/api', apiRouter);

const main = () => {
	const port = 8000;
	app.listen(port).then(() => console.log(`Server started on port ${port}...`));
}

main();

