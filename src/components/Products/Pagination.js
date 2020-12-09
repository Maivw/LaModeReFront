import React from "react";

export default function Paginations({ itemsPerPage, totalItems, paginate }) {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<div className="pagination__box">
			<ul className="pagination__list">
				{pageNumbers.map((num) => (
					<li
						key={num}
						className="pagination__item"
						onClick={() => paginate(num)}
					>
						<a className="pageLink">{num}</a>
					</li>
				))}
			</ul>
		</div>
	);
}
