import { cors, formParser, LunaticServer } from '@shelepuginivan/lunatic';

import { imageRouter } from './image/image.router';

const app = new LunaticServer();

app.use(cors({
	origin: 'http://localhost:3000'
}));
app.use(formParser);
app.use('/image', imageRouter);

app.listen(8000).then(() => console.log('Server started on port 8000...'));
