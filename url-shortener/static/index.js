const form = document.getElementById('form');
const result = document.getElementById('result')

form.onsubmit = async (event) => {
	event.preventDefault();

	const url = event.target.url.value;

	const res = await fetch('/', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ url })
	});

	const body = await res.json();
	result.innerText = body.url;
}
