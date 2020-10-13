import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

function Payment({ amount, onSuccess, currency }) {
	return (
		<>
			<PayPalButton
				amount={amount}
				currency={currency}
				onSuccess={(details, data) => onSuccess(details, data)}
				options={{
					clientId:
						"AbsLL0PJYBM_PKQP0PCjGSDpkcU6r-zz2l-jvVhEt3zmtGa8FHoe_IpBj_rPgtkYE431GewAo96itzsF",
				}}
			/>
		</>
	);
}

export default Payment;
