import axios from "../config/axiosConfig";
const SET_TOKEN = "SET_TOKEN";
const REMOVE_TOKEN = "REMOVE_TOKEN";
export const TOKEN_KEY = "TOKEN_KEY";
const SET_USER = "SET_USER";
const EDIT_USER = "EDIT_USER";
export const ID_KEY = "ID_KEY";

export const setToken = (token) => ({ type: SET_TOKEN, token });
export const removeToken = (token) => ({ type: REMOVE_TOKEN });
export const setUser = (user) => ({ type: SET_USER, user });
export const editUser = (user) => ({ type: EDIT_USER, user });

export const login = (params) => async (dispatch) => {
	const result = await axios.post("/users/login", params);
	dispatch(setToken(result.data.token));
	dispatch(setUser(result.data.user));
};

export const logout = () => async (dispatch, getState) => {
	window.localStorage.removeItem(TOKEN_KEY);
	dispatch(removeToken());
};

export const signup = (params) => async (dispatch) => {
	const result = await axios.post("/users", { ...params });
	dispatch(setToken(result.data.token));
	dispatch(setUser(result.data.user));
};

export default function reducer(state = { user: {} }, action) {
	switch (action.type) {
		case SET_TOKEN: {
			return {
				...state,
				token: action.token,
			};
		}

		case REMOVE_TOKEN: {
			const newState = { ...state };
			delete newState.token;
			return newState;
		}
		case SET_USER: {
			return {
				...state,
				user: action.user,
			};
		}

		default:
			return state;
	}
}
