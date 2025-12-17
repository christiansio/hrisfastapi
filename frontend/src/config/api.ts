const API_HOST ="8.212.177.238";
const API_PORT =8000;

if (!API_HOST || !API_PORT)
{
	throw new Error("API environment variables missing");
}

export const API_BASE_URL = `http://${API_HOST}:${API_PORT}`;


