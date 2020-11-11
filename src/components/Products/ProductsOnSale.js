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
	left: {
		display: "flex",
		flexDirection: "column",
		width: "fit-content",
		overflow: "hidden",
		backgroundColor: "#F2F3F5",
	},
	center: {
		width: "fit-content",
		overflow: "hidden",
		backgroundColor: "white",
	},
	right: {
		backgroundColor: "#F2F3F5",
	},
	gridList: {
		height: "auto",
	},
	icon: {
		color: "rgba(255, 255, 255, 0.54)",
		marginRight: 15,
	},
	productImgs: {
		width: "100%",
		objectFit: "cover",
	},

	link: {
		textDecoration: "none",
		color: "#07ad90",
		fontSize: "14px",
	},
	gridListTileBar: {
		width: "100%",
		backgroundColor: "white",
		marginBottom: 0,
		zIndex: 1,
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
			<Grid container spacing={3}>
				<Grid item xs={2} className={classes.left}></Grid>
				<Grid item xs={8} className={classes.center}>
					<div className={classes.root}>
						{products && (
							<GridList
								cellHeight={460}
								className={classes.gridList}
								cols={getGridListCols()}
							>
								{products.map((product) => {
									const fav = favProducts.find((f) => f.id === product.id);
									return (
										<GridListTile
											className={classes.gridListTile}
											key={product.id}
											cols={product.cols || 1}
										>
											<Link
												className={classes.link}
												to={`/products/${product.id}`}
											>
												<img
													className={classes.productImgs}
													src={product.photo}
													alt={product.photo}
												/>
											</Link>
											<GridListTileBar
												className={classes.gridListTileBar}
												title={
													<strong>
														<span
															style={{
																color: "#363A40",
																textDecoration: "line-through",
																fontSize: "13px",
																fontFamily: "'Poppins', sans-serif ",
																fontWeight: 300,
															}}
														>
															$
															{product.price +
																product.price * product.promotion * 0.01}
														</span>
														<span style={{ color: "#fb8c00", marginLeft: 10 }}>
															${product.price}
														</span>
														<span
															style={{
																color: "#363A40",
																fontSize: "13px",
																marginLeft: 10,
																fontFamily: "'Poppins', sans-serif ",
																fontWeight: 300,
															}}
														>
															{product.productName}
														</span>
													</strong>
												}
												actionIcon={
													<div
														style={{
															display: "flex",
															flexDirection: "row",
														}}
													>
														<IconButton
															aria-label={`star `}
															className={classes.icon}
															onClick={handleLike(product)}
														>
															<StarIcon
																style={{
																	color: fav ? "#fb8c00" : "#bdbdbd",
																	marginLeft: -5,
																}}
															/>
														</IconButton>
														<IconButton>
															<ShoppingBasketIcon
																style={{
																	color: "#363A40",
																	cursor: "pointer",
																	marginRight: 5,
																}}
																onClick={insertItemIntoCart(product, count)}
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
				<Grid item xs={2} className={classes.left}></Grid>
			</Grid>
		</>
	);
}
export default withWidth()(ProductOnSale);
