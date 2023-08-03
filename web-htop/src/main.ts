import { serveStatic, LunaticServer } from '@shelepuginivan/lunatic';
import { createServer } from 'http';
import psList from 'ps-list';
import { Server } from 'socket.io';

const app = new LunaticServer();
const httpServer = createServer(app.callback);
const io = new Server(httpServer);

app.use('/', serveStatic('static'));

io.on('connection', (socket) => {
	const sendProcessList = async () => {
		const processes = await psList();
		socket.emit('update', JSON.stringify(processes));
	}

	const updateInterval = setInterval(sendProcessList, 2000);

	socket.on('disconnect', () => clearInterval(updateInterval));
});

const main = () => {
	const port = 8000;
	httpServer.listen(port);
	console.log(`Server started on port ${port}...`);
}

main();

