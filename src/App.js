import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import AllProducts from "./components/Products/AllProducts";
import SingleProduct from "./components/Products/SingleProduct";
import Home from "./components/Home/Home";
import ProductBasedOnList from "./components/Products/ProductBasedOnList";
import ProductOnSale from "./components/Products/ProductsOnSale";
import CartScreen from "./components/CartAndCheckout/CartScreen";
import Checkout from "./components/CartAndCheckout/Checkout";
import FavoriteProducts from "./components/Products/FavoriteProducts";

export default function App(props) {
	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/products/:id" component={SingleProduct} />
					<Route exact path="/products" component={AllProducts} />
					<Route
						exact
						path="/productlist/:productListName"
						component={ProductBasedOnList}
					/>
					<Route
						exact
						path="/products/promotion/:promotion"
						component={ProductOnSale}
					/>
					<Route
						exact
						path="/products/promotion/:category/:promotion"
						component={ProductOnSale}
					/>
					<Route path="/signup" exact={true} component={Signup} />
					<Route path="/login" exact={true} component={Login} />
					<Route path="/cart" exact={true} component={CartScreen} />
					<Route path="/favorite" exact={true} component={FavoriteProducts} />
					<Route path="/checkout" exact={true} component={Checkout} />
				</Switch>
			</BrowserRouter>
		</>
	);
}
