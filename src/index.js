addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
	const lurkrEndpoint = 'https://api.lurkr.gg/v2/levels/1356262077857267904/export';

	const exportDataResponse = await fetch(lurkrEndpoint, {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTcxOTY3MzE5Mjg3Nzk5ODIwIiwiaWF0IjoxNzQzNDk4NzY4LCJleHAiOjE3NDQxMDM1Njh9.Mpqw9IVWbKnOgN3fXUTIKNyguZqPw6KaA-l765iBDrA',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({}),
	});

	const exportData = await exportDataResponse.json();
	const url = exportData.url;

	const levelDataResponse = await fetch(url, {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTcxOTY3MzE5Mjg3Nzk5ODIwIiwiaWF0IjoxNzQzNDk4NzY4LCJleHAiOjE3NDQxMDM1Njh9.Mpqw9IVWbKnOgN3fXUTIKNyguZqPw6KaA-l765iBDrA',
		}
	})

	const levelData = await levelDataResponse.json();

	return new Response(JSON.stringify({
		"length": levelData.levels.length,
		...levelData,
	}), {
		headers: { 'Content-Type': 'application/json' },
	});
}
