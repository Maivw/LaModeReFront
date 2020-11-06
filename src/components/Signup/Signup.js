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
		<div className="signup__page">
			<div class="login__brand">
				<span class="login__brand-text">LaMode</span>
			</div>
			<h1 className="singup__heading">Sign Up</h1>
			<form className="login__form" autocomplete="off">
				<div className="form__group">
					<label forHTML="email" class="form__label">
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
					<label forHTML="username" class="form__label">
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
				{/* <div className="form__group">
					<label forHTML="firstname" class="form__label">
						First Name
					</label>
					<input
						className="form__input"
						type="text"
						placeholder="First Name"
						value={fieldState.firstName}
						onChange={update}
						name="firstName"
						id="firstName"
						required
					/>
				</div>
				<div className="form__group">
					<label forHTML="lastname" class="form__label">
						Last Name
					</label>
					<input
						className="form__input"
						type="text"
						placeholder="Last Name"
						value={fieldState.lastName}
						onChange={update}
						name="lastName"
						id="lastName"
						required
					/>
				</div>
				<div className="form__group">
					<label forHTML="phoneNum" class="form__label">
						Phone Number
					</label>
					<input
						className="form__input"
						type="text"
						placeholder="6093257689"
						value={fieldState.phoneNum}
						onChange={update}
						pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
						name="phoneNum"
						id="phoneNum"
						required
					/>
				</div> */}
				<div className="form__group">
					<label forHTML="password" class="form__label">
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
					<label forHTML="confirmPassword" class="form__label">
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
