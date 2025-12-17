const API_HOST =import.meta.env.VITE_API_HOST;
const API_PORT =import.meta.env.VITE_API_PORT;

if (!API_HOST || !API_PORT)
{
	throw new Error("API environment variables missing");
}

export const API_BASE_URL = `http://${API_HOST}:${API_PORT}`;


