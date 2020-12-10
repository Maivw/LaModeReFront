import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../reducers/authentication";
import "../../index.css";
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
		<div className="signup__page">
			<div className="login__brand">
				<span className="login__brand-text">LaMode</span>
			</div>
			<h1 className="singup__heading">Sign Up</h1>
			<form className="login__form" autoComplete="off">
				<div className="form__group">
					<label forhtml="email" className="form__label">
						Email
					</label>
					<input
						className="form__input"
						type="text"
						placeholder="Email"
						value={fieldState.email}
						onChange={update}
						name="email"
						id="email"
						required
					/>
				</div>
				<div className="form__group">
					<label forhtml="username" className="form__label">
						User Name
					</label>
					<input
						className="form__input"
						type="text"
						placeholder="User Name"
						value={fieldState.username}
						onChange={update}
						name="username"
						id="userame"
						required
					/>
				</div>
				<div className="form__group">
					<label forhtml="password" className="form__label">
						Password
					</label>
					<input
						className="form__input"
						type="password"
						placeholder="Password"
						value={fieldState.password}
						onChange={update}
						name="password"
						id="password"
						required
					/>
				</div>
				<div className="form__group">
					<label forhtml="confirmPassword" className="form__label">
						Confirm Password
					</label>
					<input
						className="form__input"
						type="password"
						placeholder="Confirm Password"
						value={fieldState.comfirmPassword}
						onChange={update}
						name="confirmPassword"
						id="confirmPassword"
						autoComplete="nope"
						required
					/>
					<button className="btn__signup" onClick={handleSignup}>
						Sign up
					</button>
					<p className="signup__already">
						Already have an account?
						<span>
							<Link className="login__link" to="/login">
								Login
							</Link>
						</span>
					</p>
				</div>
			</form>
		</div>
	);
}
