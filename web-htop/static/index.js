import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io();

const processRow = (process) => `<tr>
	<td>${process.pid}</td>
	<td>${process.name}</td>
</tr>`

socket.on('update', (data) => {
	const root = document.querySelector('table#root');
	const processes = JSON.parse(data);

	const tableHead = `<thead style="position: sticky; top: 0">
	<tr>
		<th>pid</th>
		<th>name</th>
	</tr>
<thead>`

	const tableBody = `<tbody>
		${processes.map(processRow).join('')}
	</tbody>`

	root.innerHTML = tableHead + tableBody;
});

