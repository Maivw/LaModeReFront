import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../reducers/cartManagement";
import {
	removeFromFavList,
	getOneProduct,
} from "../../reducers/productManagement";
import Navbar from "../Navbar/Navbar";
import DeleteIcon from "@material-ui/icons/Delete";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

export default function FavoriteProducts(props) {
	const dispatch = useDispatch();
	const [count, setCount] = useState(1);
	const products = useSelector(
		(state) => state.productManagement.favoriteProducts
	);

	const handleRemoveFromFavList = (p) => () => {
		dispatch(removeFromFavList(p));
	};
	const insertItemIntoCart = (p, count) => () => {
		dispatch(addToCart(p, count));
	};
	const getProductDetail = (p, id) => () => {
		dispatch(getOneProduct(p, p.id));
	};

	return (
		<div>
			<Navbar />
			<Container maxWidth="md" className="wishlist__box">
				{products &&
					products.map((p) => (
						<ul key={p.id} className="wishlist__items">
							<div className="wishlist__item--left">
								<img
									className="wishlist__item--image"
									key={p.id}
									src={p.photo}
									alt={p.productName}
								/>
								<div className="wishlist__item--icons">
									<div className="wishlist__item--icons-shoppingbag">
										<ShoppingBasketIcon
											onClick={insertItemIntoCart(p, count)}
										/>
									</div>
									<div className="wishlist__item--icons-delete">
										<DeleteIcon onClick={handleRemoveFromFavList(p)} />
									</div>
								</div>
								<Link
									to={`/products/${p.id}`}
									style={{ textDecoration: "none" }}
								>
									<div
										className="wishlist__item--icons-enlarge"
										onClick={getProductDetail(p, p.id)}
									>
										<ZoomInIcon style={{ fontSize: "13px" }} />
										Enlarge
									</div>
								</Link>
							</div>
							<div className="wishlist__item--right">
								<p className="wishlist__item--right-productName">
									{p.productName}
								</p>
								<p className="wishlist__item--right-productPrice">
									<span>$</span>
									{p.price}
								</p>
								<p className="wishlist__item--right-productCode">
									Code:
									<span>{p.productCode}</span>
								</p>

								<p className="wishlist__item--right-productColor">
									Color:
									<span>{p.color}</span>
								</p>
								<p className="wishlist__item--right-productDescription">
									Description:
									<span>{p.description}</span>
								</p>
							</div>
						</ul>
					))}
			</Container>
		</div>
	);
}
