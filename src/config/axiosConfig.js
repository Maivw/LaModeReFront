import { create } from "axios";
import { store } from "../index";

const api = create({
	baseURL: "https://lamodebackend.herokuapp.com/",
	// baseURL: "http://localhost:8080",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
	timeout: 60000,
});

api.interceptors.request.use((config) => {
	const state = store.getState();
	const token = state.authentication.token;
	console.log("TOKEN", token);
	return {
		...config,
		headers: { ...config.headers, Authorization: `Bearer ${token}` },
	};
});

export default api;
