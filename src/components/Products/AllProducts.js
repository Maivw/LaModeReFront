import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, likeProudct } from "../../reducers/productManagement";
import { addToCart } from "../../reducers/cartManagement";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import FilterProducts from "./FilterProducts";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import Navbar from "../Navbar/Navbar";
import Paginations from "./Pagination";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import "./AllProducts.css";
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	left: {
		display: "flex",
		flexDirection: "column",
		width: "fit-content",
		overflow: "hidden",
		backgroundColor: "white",
		marginLeft: "5%",
	},
	center: {
		width: "fit-content",
		overflow: "hidden",
		backgroundColor: "white",
		marginRight: "5%",
	},
	right: {
		backgroundColor: "white",
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

function AllProducts(props) {
	const [count, setCount] = useState(1);
	const [filterValue, setFilterValue] = useState("");
	const [sortBy, setSortBy] = useState("lowest");
	const [filterAndSort, setFilterAndSort] = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(9);

	const products = useSelector((state) => state.productManagement.products);
	const filtered = useSelector((state) => state.productManagement.filtered);
	const favProducts = useSelector(
		(state) => state.productManagement.favoriteProducts
	);
	const renderProducts =
		filterAndSort.filterBy || filterAndSort.sortBy ? filtered : products;

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProducts(products));
	}, []);
	const classes = useStyles();

	const onFilter = (value) => setFilterValue(value);
	const onFilterByPrice = (sort) => setSortBy(sort);
	const onFilterAndSort = (sortFilter) => setFilterAndSort(sortFilter);
	const handleLike = (product) => () => {
		dispatch(likeProudct(product));
	};
	const insertItemIntoCart = (p, count) => () => {
		dispatch(addToCart(p, count));
	};

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = renderProducts.slice(indexOfFirstItem, indexOfLastItem);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
		<div>
			<Navbar />
			<Grid container spacing={3}>
				<Grid item xs className={classes.left}>
					<p className="filter__text">Filter Products</p>
					<div className="pagination__box">
						<p>
							Page: <span sytle={{ marginLeft: "10px" }}> {currentPage}</span>
						</p>
						<Paginations
							itemsPerPage={itemsPerPage}
							totalItems={products.length}
							paginate={paginate}
						/>
					</div>
					<div className="filter__box">
						<FilterProducts
							filterValue={onFilter}
							filterPrice={onFilterByPrice}
							filterSortAndFilter={onFilterAndSort}
						/>
					</div>
				</Grid>
				<Grid item xs={8} className={classes.center}>
					<div className={classes.root}>
						{currentItems && (
							<GridList
								cellHeight={460}
								className={classes.gridList}
								cols={getGridListCols()}
							>
								{currentItems.map((product) => {
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
														{product.promotion <= 0 ? (
															<>
																<span style={{ color: "#363A40" }}>
																	${product.price}
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
																</span>
															</>
														) : (
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
																<span
																	style={{ color: "#fb8c00", marginLeft: 10 }}
																>
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
														)}
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
			</Grid>
		</div>
	);
}
export default withWidth()(AllProducts);
