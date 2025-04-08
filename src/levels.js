export default {
	async fetch(request, env) {
		const token = env.LURKR_API_KEY;
		return handleRequest(token);
	},
};

function parseJwt (token) {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	return JSON.parse(jsonPayload);
}

async function getLevelData(url) {
	const levelDataResponse = await fetch(url, { method: 'GET'})
	const levelData = await levelDataResponse.json();

	return {
		"length": levelData.levels.length,
		...levelData
	}
}

async function handleRequest(token) {
	const curUnix = Math.round(Date.now() / 1000);
	if (parseJwt(token).exp - curUnix <= 0) {
		return new Response("ROTATE TOKEN")
	}

	const lurkrExportEndpoint = 'https://api.lurkr.gg/v2/levels/1356262077857267904/export';
	let exportData = null;

	const exportDataResponse = await fetch(lurkrExportEndpoint, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${token}`,
		},
	});

	exportData = await exportDataResponse.json();

	if (exportData.message === 'No leveling data exports found') {
		const postResponse = await fetch(lurkrExportEndpoint, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({}),
		});

		exportData = await postResponse.json();
	}

	if (!exportData.url) {
		return new Response(JSON.stringify({"error": true, "message": exportData.message}))
	}

	const levelData = await getLevelData(exportData.url);

	return new Response(JSON.stringify({"error": false, levelData}));
}
