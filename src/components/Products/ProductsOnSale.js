import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsOnSale } from "../../reducers/productManagement";
import { likeProudct } from "../../reducers/productManagement";
import { addToCart } from "../../reducers/cartManagement";
import "../../index.css";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import Navbar from "../Navbar/Navbar";
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
function ProductOnSale(props) {
	const [count, setCount] = useState(1);
	const insertItemIntoCart = (p, count) => () => {
		dispatch(addToCart(p, count));
	};
	const products = useSelector((state) => state.productManagement.products);
	const favProducts = useSelector(
		(state) => state.productManagement.favoriteProducts
	);
	const { promotion, category } = props.match.params;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProductsOnSale(promotion, category, products));
	}, [promotion, category]);
	const classes = useStyles();
	const handleLike = (product) => () => {
		dispatch(likeProudct(product));
	};
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
								{products.map((product) => {
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
export default withWidth()(ProductOnSale);
