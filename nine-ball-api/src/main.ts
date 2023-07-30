import { LunaticServer } from '@shelepuginivan/lunatic';

import { apiRouter } from './api/api.router';

const app = new LunaticServer();

app.use('/api', apiRouter);

const main = () => {
	const port = 8000;
	app.listen(port);
	console.log(`Server started on port ${port}...`);
}

main();

