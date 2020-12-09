import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../../reducers/productManagement";
export default function FilterProducts(props) {
	const [sortBy] = useState();

	const [filterSort, setFilterSort] = useState({ filterBy: "", sortBy: "" });
	const size = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

	const dispatch = useDispatch();
	const filterProduct = (value) => () => {
		setFilterSort((prev) => ({ ...prev, filterBy: value }));
		dispatch(filterProducts({ ...filterSort, filterBy: value }));
	};
	const handleChangeSort = (e) => {
		e.persist();
		setFilterSort((prev) => ({ ...prev, sortBy: e.target.value }));
		dispatch(filterProducts({ ...filterSort, sortBy: e.target.value }));
	};

	useEffect(() => {
		props.filterSortAndFilter(filterSort);
	}, [filterSort]);
	return (
		<div className="allproducts__box-left-filter-bar">
			<p className="allproducts__box-left-filter-text">Size</p>
			<div className="allproducts__box-left-filter-sizes">
				{size.map((e, i) => (
					<div
						onClick={filterProduct(e)}
						key={i}
						style={{
							color: e === filterSort.filterBy ? "#fb8c00" : "#757575",
						}}
						className="allproducts__box-left-filter-size"
					>
						{e}
					</div>
				))}
			</div>
			<p className="allproducts__box-left-filter-text">Price</p>
			<div className="allproducts__box-left-filter-price">
				<label htmlFor="price"></label>
				<select
					className="allproducts__box-left-filter-input"
					value={sortBy}
					onChange={handleChangeSort}
				>
					<option value="lowest">Lowest to Highest</option>
					<option value="highest">Highest to Lowest</option>
				</select>
			</div>
		</div>
	);
}
