import axios from "../config/axiosConfig";
const DISPLAY_PRODUCTS = "DISPLAY_PRODUCTS";
const CURRENT_PRODUCT = "CURRENT_PRODUCT";
const PRODUCTONSALE = "PRODUCTONSALE";
const PRODUCTBASEONLIST = "PRODUCTBASEONLIST ";
const FILTER_PRODUCTS_BY_SIZE = "FILTER_PRODUCTS_BY_SIZE";
const LIKE_PRODUCT = "LIKE_PRODUCT";
const UNLIKE_PRODUCT = "UNLIKE_PRODUCT";

export const likeProudct = (product) => (dispatch) => {
	dispatch({
		type: LIKE_PRODUCT,
		product,
	});
};

export const removeFromFavList = (product) => (dispatch) => {
	dispatch({ type: UNLIKE_PRODUCT, product });
};

export const displayProducts = (products) => ({
	type: DISPLAY_PRODUCTS,
	products,
});
export const displayProductsOnSale = (products) => ({
	type: PRODUCTONSALE,
	products,
});
export const getCurrentProduct = (currentProduct) => ({
	type: CURRENT_PRODUCT,
	currentProduct,
});
export const productBasedOnList = (products) => ({
	type: PRODUCTBASEONLIST,
	products,
});

export const filterProducts = (params) => (dispatch) => {
	dispatch({
		type: FILTER_PRODUCTS_BY_SIZE,
		payload: params,
	});
};

export const getOneProduct = (id, params) => async (dispatch) => {
	const result = await axios.get(`/products/${id}`, params);
	dispatch(getCurrentProduct(result.data.product));
};

export const getProducts = (params) => async (dispatch) => {
	const result = await axios.get(`/products`, params);
	dispatch(displayProducts(result.data.products));
};

export const getProductBasedOnList = (productListName, params) => async (
	dispatch
) => {
	const result = await axios.get(`/productlist/${productListName}`, params);
	dispatch(productBasedOnList(result.data));
};

export const getProductsOnSale = (promotion, category, params) => async (
	dispatch
) => {
	const result = await axios.get(
		`/products/promotion/${category}/${promotion}`,
		params
	);

	dispatch(displayProductsOnSale(result.data));
};

const initialState = { products: [], favoriteProducts: [] };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case DISPLAY_PRODUCTS: {
			return {
				...state,
				products: action.products,
			};
		}
		case CURRENT_PRODUCT: {
			return {
				...state,
				currentProduct: action.currentProduct,
			};
		}

		case PRODUCTBASEONLIST: {
			return {
				...state,
				...action.products,
			};
		}
		case PRODUCTONSALE: {
			return {
				...state,
				...action.products,
			};
		}
		case FILTER_PRODUCTS_BY_SIZE: {
			const productFiltered = state.products
				.filter((p) =>
					action.payload.filterBy
						? p.availableSize.includes(action.payload.filterBy)
						: p
				)
				.sort((a, b) =>
					action.payload.sortBy === "lowest"
						? a.price - b.price
						: b.price - a.price
				);

			return {
				...state,
				filtered: productFiltered,
			};
		}

		case LIKE_PRODUCT: {
			let newState = [...state.favoriteProducts];
			const product = newState.find((p) => p.id === action.product.id);

			if (!product) {
				newState.push(action.product);
			} else {
				newState = newState.filter((p) => p.id !== product.id);
			}

			return {
				...state,
				favoriteProducts: [...newState],
			};
		}
		case UNLIKE_PRODUCT: {
			let newState = [...state.favoriteProducts];
			newState = newState.filter((p) => p.id !== action.product.id);
			return {
				...state,
				favoriteProducts: [...newState],
			};
		}

		default:
			return state;
	}
}

/**
 * {products: [], currentProduct: [], size: 'm', item:[{}]}
 */
