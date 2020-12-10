import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../../reducers/cartManagement";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { addQuantity, subQuantity } from "../../reducers/cartManagement";
import Navbar from "../Navbar/Navbar";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: "#f5f5f5",
		color: "#363A40",
		borderTopLeftRadius: "2rem",
		borderTopRightRadius: "2rem",
		zIndex: 100,
		fontFamily: "Poppins",
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
		fontFamily: "Poppins",
		fontSize: "0.8rem",
	},
}))(TableRow);

function createData(name, Quantity, Price, Total) {
	return { name, Quantity, Price, Total };
}

const useStyles = makeStyles({});

export default function CartScreen(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const products = useSelector((state) => state.cartManagement.products);

	const handleRemoveFromCart = (p) => () => {
		dispatch(removeFromCart(p));
	};

	const handleAddQuantityInCart = (p) => () => {
		dispatch(addQuantity(p));
	};
	const handleSubQuantityInCart = (p) => () => {
		dispatch(subQuantity(p));
	};
	let total = 0;

	return (
		<div>
			<Navbar />
			<TableContainer className="cart__box">
				<Table className="cart__table" aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell style={{ width: "25%" }} align="center">
								Item
							</StyledTableCell>
							<StyledTableCell style={{ width: "25%" }} align="center">
								Quantity
							</StyledTableCell>
							<StyledTableCell style={{ width: "25%" }} align="center">
								Price
							</StyledTableCell>
							<StyledTableCell style={{ width: "25%" }} align="center">
								Total
							</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{products &&
							products.map((p) => {
								return (
									<StyledTableRow key={p.id}>
										<StyledTableCell align="center">
											<img
												className="cart__image"
												key={p.id}
												src={p.photo}
												alt={p.productName}
											/>
											<DeleteIcon
												onClick={handleRemoveFromCart(p)}
												style={{ color: "#9b9a9a", cursor: "pointer" }}
											/>
										</StyledTableCell>
										<StyledTableCell align="center">
											<div className="cart__quantity">
												<span>
													<AddIcon
														onClick={handleAddQuantityInCart(p)}
														style={{ cursor: "pointer" }}
													/>
												</span>
												<div style={{ textAlign: "center" }}> {p.count}</div>
												<span>
													<RemoveIcon
														onClick={handleSubQuantityInCart(p)}
														style={{ cursor: "pointer" }}
													/>
												</span>
											</div>
										</StyledTableCell>
										<StyledTableCell align="center">
											<div style={{ color: "#757575", fontSize: "0.8rem" }}>
												${p.price}
											</div>
										</StyledTableCell>
										<StyledTableCell align="center">
											<div style={{ color: "#757575", fontSize: "0.8rem" }}>
												${p.count * p.price}
											</div>
										</StyledTableCell>
									</StyledTableRow>
								);
							})}
					</TableBody>
					{products ? (
						((total = products
							.map((p) => p.count * p.price)
							.reduce(function (accumulator, currentValue) {
								return accumulator + currentValue;
							}, 0)),
						(
							<TableBody>
								<TableRow>
									<StyledTableCell style={{ width: "25%" }}>
										<Link to="/checkout" style={{ textDecoration: "none" }}>
											<div className="cart__text">Checkout</div>
										</Link>
									</StyledTableCell>
									<StyledTableCell style={{ width: "25%" }}></StyledTableCell>
									<StyledTableCell style={{ width: "25%" }}></StyledTableCell>
									<StyledTableCell style={{ width: "100%" }} align="center">
										<strong style={{ fontSize: 20 }}>
											<LocalAtmIcon /> <span>{total}</span>
										</strong>
									</StyledTableCell>
								</TableRow>
							</TableBody>
						))
					) : (
						<Redirect to="/products" />
					)}
				</Table>
			</TableContainer>
		</div>
	);
}
