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
import Divider from "@material-ui/core/Divider";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import "./FavoriteProducts.css";

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
									<Link
										to={`/products/${p.id}`}
										style={{ textDecoration: "none" }}
									>
										<p
											style={{
												fontSize: "0.7rem",
												color: "#757575",
												cursor: "zoom-in",
											}}
											onClick={getProductDetail(p, p.id)}
										>
											<span>
												<ZoomInIcon style={{ fontSize: "13px" }} />
											</span>
											Enlarge
										</p>
									</Link>
									<ShoppingBasketIcon
										style={{
											marginTop: -40,
											color: "#363A40",
											marginLeft: -70,
											cursor: "pointer",
										}}
										onClick={insertItemIntoCart(p, count)}
									/>
									<DeleteIcon
										style={{
											marginTop: -40,
											color: "#363A40",
											marginRight: 220,
											cursor: "pointer",
										}}
										onClick={handleRemoveFromFavList(p)}
									/>
								</div>
							</div>
							<div className="wishlist__item--right">
								<p className="wishlist__item--right productName">
									{p.productName}
								</p>
								<p className="wishlist__item--right productPrice">
									<span>$</span>
									{p.price}
								</p>
								<p>
									Code:
									<span className="wishlist__item--right productCode">
										{p.productCode}
									</span>
								</p>

								<p>
									Color:
									<span className="wishlist__item--right productColor">
										{p.color}
									</span>
								</p>
								<p>
									Description:
									<span className="wishlist__item--right productDescription">
										{p.description}
									</span>
								</p>
							</div>
						</ul>
					))}
			</Container>
		</div>
	);
}
