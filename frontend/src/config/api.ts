const API_HOST = import.meta.env.VITE_API_HOST;
const API_PORT = import.meta.env.VITE_API_PORT;

export const API_BASE_URL = import.meta.env.DEV
	? `http://${API_HOST}:${API_PORT}`
	: ''; // Use Nginx path for production

console.log("Current Mode:", import.meta.env.MODE);
console.log("Base URL:", API_BASE_URL);


