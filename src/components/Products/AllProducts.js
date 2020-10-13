import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, likeProudct } from "../../reducers/productManagement";
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
import "./AllProducts.css";
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
		overflow: "hidden",
		backgroundColor: theme.palette.background.paper,
	},
	gridList: {
		width: 960,
		height: "auto",
	},
	icon: {
		color: "rgba(255, 255, 255, 0.54)",
		marginRight: 15,
	},
	productImgs: {
		width: "auto",
		height: 450,
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
		marginBottom: 10,
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
		<div className="allProducts__box">
			<Navbar />
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				className="allProducts__box--head"
			>
				<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
					<h4>Filter Products</h4>
					<FilterProducts
						filterValue={onFilter}
						filterPrice={onFilterByPrice}
						filterSortAndFilter={onFilterAndSort}
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
					<div className="paginationBox">
						<p sytle={{ fontSize: 12 }}>Page: {currentPage}</p>
						<Paginations
							itemsPerPage={itemsPerPage}
							totalItems={products.length}
							paginate={paginate}
						/>
					</div>
				</Grid>
			</Grid>
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
									<Link className={classes.link} to={`/products/${product.id}`}>
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
														<span style={{ color: "black" }}>
															${product.price}
															<span
																style={{
																	color: "black",
																	fontSize: "0.8rem",
																	marginLeft: 10,
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
																color: "black",
																textDecoration: "line-through",
																fontSize: "0.8rem",
															}}
														>
															$
															{product.price +
																product.price * product.promotion * 0.01}
														</span>
														<span style={{ color: "red", marginLeft: 10 }}>
															${product.price}
														</span>
														<span
															style={{
																color: "black",
																fontSize: "0.8rem",
																marginLeft: 10,
															}}
														>
															{product.productName}
														</span>
													</strong>
												)}
											</strong>
										}
										actionIcon={
											<>
												<IconButton
													aria-label={`star `}
													className={classes.icon}
													onClick={handleLike(product)}
												>
													<StarIcon
														style={{ color: fav ? "black" : "#bdbdbd" }}
													/>
												</IconButton>
											</>
										}
									/>
								</GridListTile>
							);
						})}
					</GridList>
				)}
			</div>
		</div>
	);
}
export default withWidth()(AllProducts);
