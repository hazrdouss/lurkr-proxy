addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
	const apiUrl = 'https://api.lurkr.gg/v2/levels/1356262077857267904/export'; // Your API URL

	const response = await fetch(apiUrl, {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTcxOTY3MzE5Mjg3Nzk5ODIwIiwiaWF0IjoxNzQzNDk4NzY4LCJleHAiOjE3NDQxMDM1Njh9.Mpqw9IVWbKnOgN3fXUTIKNyguZqPw6KaA-l765iBDrA', // Replace with your token
			'Origin': 'https://lurkr.gg',
		},
	});

	const data = await response.json();

	return new Response(JSON.stringify(data), {
		headers: { 'Content-Type': 'application/json' },
	})
}
