import React from "react";
import "./pagination.css";

export default function Paginations({ itemsPerPage, totalItems, paginate }) {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<div className="pagination__box">
			<ul className="pagination">
				{pageNumbers.map((num) => (
					<li key={num} className="pageItem">
						<a onClick={() => paginate(num)} className="pageLink">
							{num}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
