import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../reducers/authentication";
import "./Signup.css";
import { Link } from "react-router-dom";

export default function Signup(props) {
	const [fieldState, setFieldState] = useState({});
	const token = useSelector((state) => state.authentication.token);
	const dispatch = useDispatch();

	const handleSignup = async (e) => {
		e.preventDefault();
		dispatch(signup(fieldState));
	};

	const update = (e) => {
		const { name, value } = e.target;
		setFieldState((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="signup_page">
			<div className="sign-up-form" style={{ color: "white" }}>
				<p>
					Please fill in all the required
					<br></br>
					fields to create a new user account.
				</p>
				<input
					className="signup-in-form-field"
					type="text"
					placeholder="Email"
					value={fieldState.email}
					onChange={update}
					name="email"
					id="email"
					required
				/>
				<input
					className="signup-in-form-field"
					type="text"
					placeholder="User Name"
					value={fieldState.username}
					onChange={update}
					name="username"
					id="userame"
					required
				/>
				<input
					className="signup-in-form-field"
					type="text"
					placeholder="First Name"
					value={fieldState.firstName}
					onChange={update}
					name="firstName"
					id="firstName"
					required
				/>
				<input
					className="signup-in-form-field"
					type="text"
					placeholder="Last Name"
					value={fieldState.lastName}
					onChange={update}
					name="lastName"
					id="lastName"
					required
				/>
				<input
					className="signup-in-form-field"
					type="text"
					placeholder="6093257689"
					value={fieldState.phoneNum}
					onChange={update}
					pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
					name="phoneNum"
					id="phoneNum"
					required
				/>
				<input
					className="signup-in-form-field"
					type="password"
					placeholder="Password"
					value={fieldState.password}
					onChange={update}
					name="password"
					id="password"
					required
				/>
				<input
					className="signup-in-form-field"
					type="password"
					placeholder="Confirm Password"
					value={fieldState.comfirmPassword}
					onChange={update}
					name="confirmPassword"
					id="confirmPassword"
					autoComplete="nope"
					required
				/>
				<button className="sign-up-button" onClick={handleSignup}>
					SIGNUP
				</button>
				<h3>
					Already have an account?
					<span>
						<Link
							style={{
								textDecoration: "none",
								color: "white",
								marginLeft: 10,
							}}
							className="sign-up"
							to="/login"
						>
							LOGIN
						</Link>
					</span>
				</h3>
			</div>
		</div>
	);
}
