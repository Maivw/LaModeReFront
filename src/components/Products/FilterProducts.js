import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../../reducers/productManagement";
import "./filterProducts.css";
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
		<div className="filter__bar">
			<p>Size</p>
			<div className="filter__sizes">
				{size.map((e, i) => (
					<div
						onClick={filterProduct(e)}
						key={i}
						style={{
							backgroundColor: e === filterSort.filterBy ? "#fb8c00" : "white",
							border:
								e === filterSort.filterBy
									? " 1px solid white"
									: "1px solid #bdbdbd",
							color: e === filterSort.filterBy ? "white" : "#363A40",
						}}
						className="filter__sizes--item "
					>
						<span>{e}</span>
					</div>
				))}
			</div>
			<p>Price</p>
			<div className="filByPrice">
				<label htmlFor="price"></label>
				<select id="filter__price" value={sortBy} onChange={handleChangeSort}>
					<option value="lowest">Lowest to Highest</option>
					<option value="highest">Highest to Lowest</option>
				</select>
			</div>
		</div>
	);
}
