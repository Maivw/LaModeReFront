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
import { Redirect } from "react-router-dom";
import "./CartScreen.css";

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
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
	},
}))(TableRow);

function createData(name, Quantity, Price, Total) {
	return { name, Quantity, Price, Total };
}

const useStyles = makeStyles({
	table: {
		minWidth: 400,
		width: "80%",
	},
});

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
			<TableContainer
				style={{
					margin: "1rem auto",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell
								style={{ width: "25%", borderRadius: "10" }}
								align="center"
							>
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
												style={{ width: 60, borderRadius: 10, marginRight: 10 }}
												key={p.id}
												src={p.photo}
												alt={p.productName}
											/>
											<DeleteIcon onClick={handleRemoveFromCart(p)} />
										</StyledTableCell>
										<StyledTableCell align="center">
											<div className="quantity__bar">
												<span>
													<AddIcon onClick={handleAddQuantityInCart(p)} />
												</span>
												<div style={{ textAlign: "center" }}> {p.count}</div>
												<span>
													<RemoveIcon onClick={handleSubQuantityInCart(p)} />
												</span>
											</div>
										</StyledTableCell>
										<StyledTableCell align="center">
											<div> ${p.price}</div>
										</StyledTableCell>
										<StyledTableCell align="center">
											<div>${p.count * p.price}</div>
										</StyledTableCell>
									</StyledTableRow>
								);
							})}
					</TableBody>
					{products ? (
						((total = products
							.map((p) => p.count * p.price)
							.reduce(function (
								accumulator,
								currentValue,
								currentIndex,
								array
							) {
								return accumulator + currentValue;
							},
							0)),
						(
							<TableBody>
								<TableRow>
									<StyledTableCell style={{ width: "25%" }}>
										<Link
											to="/checkout"
											style={{ textDecoration: "none", color: "black" }}
										>
											<strong className="checkout">Check out</strong>
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
