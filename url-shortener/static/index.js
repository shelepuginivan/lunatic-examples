const clipButton = document.getElementById('clip-button');
const form = document.getElementById('form');
const resultWrapper = document.getElementById('result-wrapper');
const result = document.getElementById('result');
const message = document.getElementById('message');

form.onsubmit = async (event) => {
	event.preventDefault();

	const url = event.target.url.value;

	try {
		const res = await fetch('/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url })
		});

		const body = await res.json();
		const shortUrl = body.url;

		resultWrapper.dataset.visible = "true";
		result.innerText = `Your URL: ${shortUrl}`;
		clipButton.onclick = () => copyToClipboard(shortUrl);
	} catch {
		message.innerText = 'An error occurred! Please try later';
		message.dataset.status = 'error';
	}
}

const copyToClipboard = async (text) => {
	if (!navigator.clipboard) {
		message.innerText = 'Your browser does not support this!';
		message.dataset.status = 'error';
		return;
	}

	try {
		await navigator.clipboard.writeText(text);
		message.innerText = 'Copied to clipboard!'
		message.dataset.status = 'success';
	} catch {
		message.innerText = 'Your browser does not support this!';
		message.dataset.status = 'error';
	}
}

