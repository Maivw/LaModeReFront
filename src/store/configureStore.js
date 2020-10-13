import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // or whatever storage you are using

import authentication from "../reducers/authentication";
import cartManagement from "../reducers/cartManagement";
import productManagement from "../reducers/productManagement";
import payment from "../reducers/payment";

const persistConfig = {
	key: "root",
	storage,
	// perist
	// whitelist: [
	//   'accountReducer'
	// ],
	// not persist
	blacklist: [
		// "cartManagement"
	],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
	authentication,
	cartManagement,
	productManagement,
	payment,
});
const persistedReducer = persistReducer(persistConfig, reducer);

const configureStore = (initialState) => {
	return createStore(
		persistedReducer,
		initialState,
		composeEnhancers(applyMiddleware(thunk))
	);
};

export default configureStore;
