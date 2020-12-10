import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Navbar from "../Navbar/Navbar";
import { useHistory } from "react-router-dom";
import Payment from "./Payment";
import { checkout } from "../../reducers/payment";
import { removeAllCart } from "../../reducers/cartManagement";
import Thankyou from "./Thankyou";
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
		.reduce(function (accumulator, currentValue) {
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
				<div className="checkout__box">
					<Thankyou open={open} onClose={onCloseThankyouModal} />
					<div className="checkout__box--head">
						<p className="checkout__box--head-text">Order Summary</p>
					</div>
					<div className="checkout__box--body">
						<p className="checkout__box--body-text">Free shipping at $50</p>
						<div className="checkout__box--body-content">
							<div>
								Shipping to :
								<input
									className="checkout__box--body--input"
									type="text"
									placeholder="Type location"
									name="shippingAddress"
									value={shippingAddress}
									autoComplete="off"
									onChange={onChangeShippingAddress}
								/>
							</div>

							<div className="checkout__box--body-content-delivery">
								Delivery :<span>within 48 hours</span>
							</div>
							<hr />
							<div className="checkout__box--body-content-quantity">
								Items <span>({itemsInCart.length})</span>
							</div>
							<div className="checkout__box--body-content-tax">
								Total before tax
								<span>${total}</span>
							</div>
							<div className="checkout__box--body-content-shipping">
								Shipping fee
								<span>${getsShippingFee()}</span>
							</div>
							<div className="checkout__box--body-content-totalorder">
								Order total
								<span>${totalOrder}</span>
							</div>
						</div>
						<div className="checkout__box--footer">
							{itemsInCart && (
								<>
									<Button
										variant="contained"
										onClick={handleCheckout}
										className="btn__placeorder"
									>
										<span style={{ textTransform: "uppercase" }}>P</span>
										lace your order
									</Button>
									<ToastContainer />
								</>
							)}
							{showPaypalButton ? (
								<div className="paypal__button">
									<Payment
										amount={totalOrder}
										currency={"USD"}
										onSuccess={paymentHandler}
									/>
								</div>
							) : null}
						</div>
					</div>
				</div>
			</Grid>
		</div>
	);
}
