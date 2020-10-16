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
		console.log("PPP", p);
		console.log("aaaaaa");
		dispatch(getOneProduct(p, p.id));
	};

	return (
		<div>
			<Navbar />
			<Container
				maxWidth="md"
				style={{ border: "1px solid #e0e0e0", marginTop: 20 }}
			>
				{products &&
					products.map((p) => (
						<ul key={p.id} style={{ display: "flex", flexDirection: "row" }}>
							<div
								style={{
									width: 350,
									height: "auto",
									marginBottom: 15,
									alignItems: "center",
								}}
							>
								<img
									style={{ width: 150, height: "auto", borderRadius: 10 }}
									key={p.id}
									src={p.photo}
									alt={p.productName}
								/>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
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
												<ZoomInIcon style={{ fontSize: "0.9rem" }} />
											</span>
											Enlarge
										</p>
									</Link>
									<ShoppingBasketIcon
										style={{
											marginTop: -40,
											color: "black",
											marginLeft: -70,
										}}
										onClick={insertItemIntoCart(p, count)}
									/>
									<DeleteIcon
										style={{
											marginTop: -40,
											color: "black",
											marginRight: 220,
										}}
										onClick={handleRemoveFromFavList(p)}
									/>
								</div>
							</div>
							<div
								style={{
									width: 350,
									height: "auto",
									marginBottom: 15,
									alignItems: "center",
									fontSize: "0.8rem",
								}}
							>
								<h2>{p.productName}</h2>
								<p>Code: {p.productCode}</p>
								<p>
									Price: <span>$</span>
									{p.price}{" "}
								</p>
								<p>Color: {p.color}</p>
								<p>Description: {p.description}</p>
							</div>
							<Divider />
						</ul>
					))}
			</Container>
		</div>
	);
}
