const ITEM_ADD_TO_CART = "ITEM_ADD_TO_CART";
const ITEM_REMOVED_FROM_CART = "ITEM_REMOVED_FROM_CART";
const SUB_QUANTITY = "SUB_QUANTITY";
const ADD_QUANTITY = "ADD_QUANTITY";
const REMOVED_CART = "REMOVED_CART";

export const addToCart = (product, quantity) => (dispatch) => {
	dispatch({
		type: ITEM_ADD_TO_CART,
		product,
		quantity,
	});
};

export const removeFromCart = (product) => (dispatch) => {
	dispatch({ type: ITEM_REMOVED_FROM_CART, product });
};

export const subQuantity = (product) => async (dispatch) => {
	dispatch({
		type: SUB_QUANTITY,
		product,
	});
};

export const addQuantity = (product) => async (dispatch) => {
	dispatch({
		type: ADD_QUANTITY,
		product,
	});
};

export const removeAllCart = () => (dispatch) => {
	dispatch({ type: REMOVED_CART });
};
const initialState = {
	products: [],
};
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ITEM_ADD_TO_CART: {
			let newState = [...state.products];
			const product = newState.find((p) => p.id === action.product.id);

			if (!product) {
				action.product.count = action.quantity;

				newState.push(action.product);
			} else {
				newState = newState.map((e) => {
					if (e.id === action.product.id) {
						e.count += action.quantity;
						return e;
					}
					return e;
				});
			}
			return {
				...state,
				products: [...newState],
			};
		}
		case ITEM_REMOVED_FROM_CART: {
			const newState = [...state.products];
			const removedProduct = newState.filter((p) => p.id !== action.product.id);
			return {
				...state,
				products: [...removedProduct],
			};
		}
		case ADD_QUANTITY: {
			let newState = [...state.products];
			const product = newState.filter((p) => p.id === action.product.id);

			if (!product) {
				action.product.count = 1;
				newState.push(action.product);
			} else {
				newState = newState.map((p) => {
					if (p.id === action.product.id) {
						p.count++;
						return p;
					}
					return p;
				});
			}

			return {
				...state,
				products: [...newState],
			};
		}
		case SUB_QUANTITY: {
			let newState = [...state.products];
			const product = newState.filter((p) => p.id === action.product.id);

			if (action.product.count === 1) {
				const removedProduct = newState.filter(
					(p) => p.id !== action.product.id
				);
				return {
					...state,
					products: [...removedProduct],
				};
			} else if (action.product.count < 2) {
				return {
					...state,
					products: [...newState],
				};
			} else {
				newState = newState.map((p) => {
					if (p.id === action.product.id) {
						p.count--;
						return p;
					}
					return p;
				});
			}

			return {
				...state,
				products: [...newState],
			};
		}
		case REMOVED_CART: {
			return {
				...state,
				products: [],
			};
		}

		default:
			return state;
	}
}
