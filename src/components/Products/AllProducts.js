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

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	gridList: {
		height: "auto",
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
			<Grid container spacing={3} className="allproducts__box">
				<Grid item xs={3} className="allproducts__box-left">
					<p className="allproducts__box-left-text">Filter Products</p>
					<div className="allproducts__box-left-pagination">
						<div className="allproducts__box-left-page">
							Page: <span> {currentPage}</span>
						</div>
						<Paginations
							itemsPerPage={itemsPerPage}
							totalItems={products.length}
							paginate={paginate}
							className="allproducts__box-left-paginate"
						/>
					</div>
					<div className="allproducts__box-left-filter">
						<FilterProducts
							filterValue={onFilter}
							filterPrice={onFilterByPrice}
							filterSortAndFilter={onFilterAndSort}
						/>
					</div>
				</Grid>
				<Grid item xs={9} className="allproducts__box-right">
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
											className="allproducts__box-product"
											key={product.id}
											cols={product.cols || 1}
										>
											<Link
												className={classes.link}
												to={`/products/${product.id}`}
											>
												<img
													className="allproducts__box-product-image"
													src={product.photo}
													alt={product.photo}
												/>
											</Link>

											<GridListTileBar
												className="allproducts__box-product-bottom"
												title={
													<div className="allproducts__box-product-detail">
														{product.promotion <= 0 ? (
															<>
																<div className="allproducts__box-product-price">
																	${product.price}
																</div>
																<div className="allproducts__box-product-name">
																	{product.productName}
																</div>
															</>
														) : (
															<>
																<div className="allproducts__box-product-price">
																	${product.price}
																	<span className="allproducts__box-product-pricesale">
																		$
																		{product.price +
																			product.price * product.promotion * 0.01}
																	</span>
																</div>
																<div className="allproducts__box-product-name">
																	{product.productName}
																</div>
															</>
														)}
													</div>
												}
												actionIcon={
													<div className="allproducts__box-product-icons">
														<IconButton
															aria-label={`star `}
															onClick={handleLike(product)}
														>
															<StarIcon
																className="allproducts__box-product-icons-star"
																style={{
																	color: fav ? "#fb8c00" : "rgb(155, 154, 154)",
																}}
															/>
														</IconButton>
														<IconButton>
															<ShoppingBasketIcon
																onClick={insertItemIntoCart(product, count)}
																className="allproducts__box-product-icons-shoppingbag"
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
