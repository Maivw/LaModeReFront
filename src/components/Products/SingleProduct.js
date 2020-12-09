import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneProduct } from "../../reducers/productManagement";
import { addToCart } from "../../reducers/cartManagement";
import ReactImageMagnify from "react-image-magnify";
import "../../index.css";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Navbar from "../Navbar/Navbar";

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
		<div style={{ backgroundColor: "#eeeeee" }}>
			<Navbar />
			{product && (
				<div className="fluid">
					<div className="fluid__image">
						<div className="fluid__image-container" style={{ width: "60%" }}>
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
						<div className="fluid__image-moreImages">
							<div className="fluid__image-moreImages-item">
								{product.smallerPhotos.map((photo) => (
									<img src={photo} alt="photo" />
								))}
							</div>
						</div>
					</div>

					<div className="fluid__detail">
						<p className="fluid__detail--productName">{product.productName}</p>
						<p className="fluid__detail--productPrice">
							<span>$</span>
							{product.price}
						</p>

						<p>
							Code:
							<span className="fluid__detail--productCode">
								{product.productCode}
							</span>
						</p>

						<p>
							Color:
							<span className="fluid__detail--productColor">
								{product.color}
							</span>
						</p>
						<p>
							Description:
							<span className="fluid__detail--productDescription">
								{product.description}
							</span>
						</p>
						<p>Quantity:</p>
						<div className="quantity__bar">
							<span>
								<AddIcon
									onClick={handleAddQuantity}
									style={{ cursor: "pointer" }}
								/>
							</span>
							<div style={{ textAlign: "center" }}> {count}</div>
							<span>
								<RemoveIcon
									onClick={handleSubQuantity}
									style={{ cursor: "pointer" }}
								/>
							</span>
						</div>
						<div className="button__addToCart">
							<Button className="btn__addToCart" onClick={handleAddToCart}>
								<span style={{ textTransform: "uppercase" }}>A</span>
								dd to cart
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
