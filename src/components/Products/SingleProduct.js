import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneProduct } from "../../reducers/productManagement";
import { addToCart } from "../../reducers/cartManagement";
import ReactImageMagnify from "react-image-magnify";
import "../../index.css";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Navbar from "../Navbar/Navbar";
import "./singleProduct.css";

export default function SingleProduct(props) {
	const [count, setCount] = useState(1);
	const product = useSelector(
		(state) => state.productManagement.currentProduct
	);

	const { id } = props.match.params;

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getOneProduct(id, product));
	}, [id]);

	const handleAddToCart = () => {
		dispatch(addToCart(product, count));
	};

	const handleAddQuantity = () => {
		setCount((count) => count + 1);
	};
	const handleSubQuantity = () => {
		if (count === 1) {
			return;
		}
		setCount((count) => count - 1);
	};

	return (
		<div>
			<Navbar />
			{product && (
				<div className="fluid">
					<div className="fluid__image-container">
						<ReactImageMagnify
							{...{
								smallImage: {
									alt: "Dress",
									isFluidWidth: true,
									src: `${product.photo}`,
								},
								largeImage: {
									src: `${product.photo}`,
									width: 1200,
									height: 1800,
								},
							}}
						/>
					</div>
					<div className="fluid__detail">
						<h2>{product.productName}</h2>
						<p>Code: {product.productCode}</p>
						<p>
							Price: <span>$</span>
							{product.price}{" "}
						</p>
						<p>Color: {product.color}</p>
						<p>Description: {product.description}</p>
						<p>Quantity:</p>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-evenly",
								backgroundColor: "#e0e0e0",
								textAlign: "center",
								paddingTop: 5,
								borderRadius: 5,
							}}
						>
							<span>
								<AddIcon onClick={handleAddQuantity} />
							</span>
							<div style={{ textAlign: "center" }}> {count}</div>
							<span>
								<RemoveIcon onClick={handleSubQuantity} />
							</span>
							<ShoppingBasketIcon
								onClick={handleAddToCart}
								style={{ color: "black" }}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
