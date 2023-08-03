import { serveStatic, LunaticServer } from '@shelepuginivan/lunatic';
import fkill from 'fkill';
import { createServer } from 'http';
import psList from 'ps-list';
import { Server } from 'socket.io';

const app = new LunaticServer();
const httpServer = createServer(app.callback);
const io = new Server(httpServer);

app.post('/kill/:pid', async (req, res) => {
	const { pid: pidString } = req.params;
	const pid = Number(pidString);

	if (isNaN(pid)) {
		return await res.status(400).json({ message: 'invalid pid' });
	}

	await fkill(pid, { force: true });
	await res.status(200).json({ message: 'target eliminated' });
});

app.use('/', serveStatic('static'));

io.on('connection', (socket) => {
	const sendProcessList = async () => {
		const processes = await psList();
		socket.emit('update', JSON.stringify(processes));
	}

	sendProcessList();

	const updateInterval = setInterval(sendProcessList, 2000);

	socket.on('disconnect', () => clearInterval(updateInterval));
});

const main = () => {
	const port = 8000;
	httpServer.listen(port);
	console.log(`Server started on port ${port}...`);
}

main();

