import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Navbar from "../Navbar/Navbar";
import { useHistory } from "react-router-dom";
import Payment from "./Payment";
import { checkout } from "../../reducers/payment";
import { removeAllCart } from "../../reducers/cartManagement";
import Thankyou from "./Thankyou";
import "./checkout.css";
import Grid from "@material-ui/core/Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Checkout(props) {
	const history = useHistory();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const token = useSelector((state) => state.authentication.token);
	const userId = useSelector((state) => state.authentication.user.id);
	const products = useSelector((state) => state.cartManagement.products);
	const itemsInCart = useSelector((state) => state.cartManagement.products);
	const [shippingAddress, setShippingAddress] = useState("");
	const notify = () => toast("Your basket is empty! ");
	const notifyPaidSuccess = () => toast("Transaction completed");
	const onChangeShippingAddress = (e) => {
		e.preventDefault();
		setShippingAddress(e.target.value);
		!itemsInCart.length && notify();
	};
	const [showPaypalButton, setShowPaypalButton] = useState(false);
	const handleCheckout = async () => {
		if (!token) {
			history.push("/login");
		}
		!itemsInCart.length && notify();
		setShowPaypalButton(true);
	};

	const paymentHandler = (details) => {
		if (details.status !== "COMPLETED") {
			return;
		}
		dispatch(
			checkout({
				payerId: details.payer.payer_id,
				userId,
				emailAddress: details.payer.email_address,
				amount: details.purchase_units[0].amount.value,
				currentcyCode: details.purchase_units[0].amount.currency_code,
				payerName:
					details.payer.name.given_name + " " + details.payer.name.surname,
				shippingAddress,
			})
		);

		notifyPaidSuccess();
		setShowPaypalButton(false);
		setOpen(true);
		dispatch(removeAllCart());
	};
	let total = itemsInCart
		.map((p) => p.count * p.price)
		.reduce(function (accumulator, currentValue, currentIndex, array) {
			return accumulator + currentValue;
		}, 0);
	const getsShippingFee = () => {
		if (total >= 50) return 0;
		if (itemsInCart && total < 50 && total > 0) return 10;
		return 0;
	};
	let totalOrder = total + getsShippingFee();
	let date = new Date();

	const onCloseThankyouModal = () => {
		setOpen(false);
	};
	return (
		<div onClick={onCloseThankyouModal}>
			<Navbar />
			<Grid container justify="center" alignItems="center" spacing={2}>
				<div className="checkoutBox">
					<Thankyou open={open} onClose={onCloseThankyouModal} />
					<div style={{ backgroundColor: "black", height: 40 }}></div>
					<h1 style={{ textAlign: "center" }}>Order Summary</h1>
					<h3 style={{ textAlign: "center" }}>Free shipping at $50</h3>
					<div>
						<div style={{ width: "50%", marginLeft: "5%" }}>
							Shipping to:
							<input
								style={{ width: "175%", height: 30 }}
								type="text"
								placeholder="Type location"
								name="shippingAddress"
								value={shippingAddress}
								onChange={onChangeShippingAddress}
							/>
						</div>

						<div style={{ width: "50%", marginLeft: "5%" }}>
							Delivery: within 48 hours
						</div>
						<hr />
						<div style={{ width: "50%", marginLeft: "5%" }}>
							Items <span>({itemsInCart.length})</span>
						</div>
						<div style={{ display: "flex", flexDirection: "row" }}>
							<div style={{ width: "50%", marginLeft: "5%" }}>
								Total before tax
							</div>
							<div style={{ width: "50%", textAlign: "center" }}>${total}</div>
						</div>
						<div style={{ display: "flex", flexDirection: "row" }}>
							<div style={{ width: "50%", marginLeft: "5%" }}>Shipping fee</div>
							<div style={{ width: "50%", textAlign: "center" }}>
								${getsShippingFee()}
							</div>
						</div>

						<Grid container justify="flex-start" direction="row">
							<Grid item xs={12} sm={12} md={4} lg={4}>
								{itemsInCart && (
									<>
										<Button
											variant="contained"
											onClick={handleCheckout}
											className="btn__placeYourOrder"
										>
											Place your order
										</Button>
										<ToastContainer />
									</>
								)}
							</Grid>

							<Grid item xs={12} sm={12} md={4} lg={4}>
								<h3 className="totalOrder">
									Order total
									<span style={{ padding: 5 }}>${totalOrder}</span>
								</h3>
							</Grid>

							{showPaypalButton ? (
								<Grid item xs={12} sm={12} md={4} lg={4}>
									<div className="paypal__button">
										<Payment
											amount={totalOrder}
											currency={"USD"}
											onSuccess={paymentHandler}
										/>
									</div>
								</Grid>
							) : (
								<Grid item xs={12} sm={12} md={4} lg={4}></Grid>
							)}
						</Grid>
						{/* </div> */}
					</div>
				</div>
			</Grid>
		</div>
	);
}
