addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
	const apiUrl = 'https://api.lurkr.gg/v2/levels/1356262077857267904/export'; // URL to check

	// Step 1: Make a GET request to the API
	const getResponse = await fetch(apiUrl, {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTcxOTY3MzE5Mjg3Nzk5ODIwIiwiaWF0IjoxNzQzNDk4NzY4LCJleHAiOjE3NDQxMDM1Njh9.Mpqw9IVWbKnOgN3fXUTIKNyguZqPw6KaA-l765iBDrA', // Replace with your Bearer token
		},
	});

	// Step 2: Check if the GET response contains the "No leveling data exports found" message
	const getData = await getResponse.json();

	if (getData.message === 'No leveling data exports found') {
		// Step 3: If the message is found, make a POST request to the same URL with a blank body
		const postResponse = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTcxOTY3MzE5Mjg3Nzk5ODIwIiwiaWF0IjoxNzQzNDk4NzY4LCJleHAiOjE3NDQxMDM1Njh9.Mpqw9IVWbKnOgN3fXUTIKNyguZqPw6KaA-l765iBDrA', // Replace with your Bearer token
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({}), // Sending an empty body as per your requirement
		});

		// Return the response from the POST request
		const postData = await postResponse.json();
		return new Response(JSON.stringify(postData), {
			headers: { 'Content-Type': 'application/json' },
		});
	}

	// If no "No leveling data" message, return the GET response as is
	return new Response(JSON.stringify(getData), {
		headers: { 'Content-Type': 'application/json' },
	});
}
