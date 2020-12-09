import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductBasedOnList } from "../../reducers/productManagement";
import { addToCart } from "../../reducers/cartManagement";
import "../../index.css";
import { Link } from "react-router-dom";
import { likeProudct } from "../../reducers/productManagement";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Navbar from "../Navbar/Navbar";
import StarIcon from "@material-ui/icons/Star";
import IconButton from "@material-ui/core/IconButton";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	gridList: {
		height: "auto",
	},
}));

function ProductBasedOnList(props) {
	const [count, setCount] = useState(1);
	const insertItemIntoCart = (p, count) => () => {
		dispatch(addToCart(p, count));
	};
	const products = useSelector((state) => state.productManagement.productList);
	const favProducts = useSelector(
		(state) => state.productManagement.favoriteProducts
	);

	const { productListName } = props.match.params;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProductBasedOnList(productListName, products));
	}, [productListName]);
	const handleLike = (product) => () => {
		dispatch(likeProudct(product));
	};
	const classes = useStyles();
	const getGridListCols = () => {
		if (isWidthUp("xl", props.width)) {
			return 4;
		}

		if (isWidthUp("lg", props.width)) {
			return 3;
		}

		if (isWidthUp("md", props.width)) {
			return 3;
		}

		return 2;
	};

	return (
		<>
			<Navbar />
			<Grid container spacing={3} className="productlist__box">
				<Grid item xs={2}></Grid>
				<Grid item xs={8} className="productlist">
					<div className={classes.root}>
						{products && (
							<GridList cellHeight={460} cols={getGridListCols()}>
								{products[0].Products.map((product) => {
									console.log(products[0].Products);
									const fav = favProducts.find((f) => f.id === product.id);
									return (
										<GridListTile
											className="productlist__wrapper"
											key={product.id}
											cols={product.cols || 1}
										>
											<Link
												className={classes.link}
												to={`/products/${product.id}`}
											>
												<img
													className="productlist__image"
													src={product.photo}
													alt={product.photo}
												/>
											</Link>
											<GridListTileBar
												className="productlist__bottom"
												title={
													<div className="productlist__detail">
														{product.promotion <= 0 ? (
															<>
																<div className="productlist__price">
																	${product.price}
																</div>
																<div className="productlist__name">
																	{product.productName}
																</div>
															</>
														) : (
															<>
																<div className="productlist__price">
																	${product.price}
																	<span className="productlist__pricesale">
																		$
																		{product.price +
																			product.price * product.promotion * 0.01}
																	</span>
																</div>
																<div className="productlist__name">
																	{product.productName}
																</div>
															</>
														)}
													</div>
												}
												actionIcon={
													<div className="productlist__icons">
														<IconButton
															aria-label={`star `}
															onClick={handleLike(product)}
														>
															<StarIcon
																className="productlist__icons-star"
																style={{
																	color: fav ? "#fb8c00" : "rgb(155, 154, 154)",
																}}
															/>
														</IconButton>
														<IconButton>
															<ShoppingBasketIcon
																onClick={insertItemIntoCart(product, count)}
																className="productlist__icons-shoppingbag"
															/>
														</IconButton>
													</div>
												}
											/>
										</GridListTile>
									);
								})}
							</GridList>
						)}
					</div>
				</Grid>
				<Grid item xs={2}></Grid>
			</Grid>
		</>
	);
}
export default withWidth()(ProductBasedOnList);
