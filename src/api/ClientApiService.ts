const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
const postPatchHeaders = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
};

async function clientApiService<TReponse>(
	url: string,
	{ method, headers, ...customConfig }: RequestInit = {}
): Promise<TReponse> {
	const endpoint = `${BASE_API_URL}/${url}`;
	const config = {
		method,
		headers,
		...customConfig,
	};

	try {
		const response = await fetch(endpoint, config);

		if (response.ok) {
			const data = await response.json();
			return data;
		}

		const errorMessage = `${response.status} ${response.statusText}`;
		throw new Error(errorMessage);
	} catch (error) {
		return Promise.reject(
			error instanceof Error ? error.message : 'An unexpected error occurred'
		);
	}
}

const clientApiServiceGet = <TResponse>(
	url: string,
	config: RequestInit = {}
) =>
	clientApiService<TResponse>(url, {
		...config,
		method: 'GET',
		headers: {
			Accept: 'application/json',
		},
	});

const clientApiServicePost = <TBody, TResponse>(
	url: string,
	body: TBody,
	config: RequestInit = {}
) =>
	clientApiService<TResponse>(url, {
		...config,
		method: 'POST',
		body: JSON.stringify(body),
		headers: postPatchHeaders,
	});

const clientApiServicePatch = <TBody, TResponse>(
	url: string,
	body: TBody,
	config: RequestInit = {}
) =>
	clientApiService<TResponse>(url, {
		...config,
		method: 'PATCH',
		body: JSON.stringify(body),
		headers: postPatchHeaders,
	});

const clientApiServiceDelete = <TResponse>(
	url: string,
	config: RequestInit = {}
) =>
	clientApiService<TResponse>(url, {
		...config,
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
		},
	});

const clientApi = {
	get: clientApiServiceGet,
	post: clientApiServicePost,
	patch: clientApiServicePatch,
	delete: clientApiServiceDelete,
};

export default clientApi;
