import { LunaticServer } from '@shelepuginivan/lunatic';

const app = new LunaticServer();

const main = () => {
	const port = 8000;
	app.listen(port);
	console.log(`Server started on port ${port}...`);
}

main();

