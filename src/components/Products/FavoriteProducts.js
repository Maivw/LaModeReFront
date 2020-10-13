import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../reducers/cartManagement";
import { removeFromFavList } from "../../reducers/productManagement";
import Navbar from "../Navbar/Navbar";
import DeleteIcon from "@material-ui/icons/Delete";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";

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

	return (
		<div>
			<Navbar />
			<Container
				maxWidth="md"
				style={{ border: "1px solid #e0e0e0", marginTop: 20 }}
			>
				{products &&
					products.map((p) => (
						<ul key={p.id}>
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
									<ShoppingBasketIcon
										style={{
											marginTop: -40,
											color: "black",
											marginLeft: 20,
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
							<Divider />
						</ul>
					))}
			</Container>
		</div>
	);
}
