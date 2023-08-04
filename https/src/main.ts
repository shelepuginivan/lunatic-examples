import { LunaticServer } from '@shelepuginivan/lunatic';
import { readFileSync } from 'fs';
import * as http from 'http';
import * as https from 'https';
import { join } from 'path';

const cert = readFileSync(join(__dirname, '..', 'cert.pem'));
const key = readFileSync(join(__dirname, '..', 'key.pem'));

const app = new LunaticServer();

const httpServer = http.createServer(app.callback);
const httpsServer = https.createServer({ cert, key }, app.callback);

app.get('/', (req, res) => {
	res.status(200).json({ protocol: req.protocol });
});

const main = () => {
	const httpPort = 8080;
	const httpsPort = 8443;

	httpServer.listen(httpPort);
	httpsServer.listen(httpsPort);
	
	console.log(`HTTP server started on port ${httpPort}...`);
	console.log(`HTTPS server started on port ${httpsPort}...`);
}

main();

