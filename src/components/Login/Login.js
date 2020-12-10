import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/authentication";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "../../index.css";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));

export default function Login(props) {
	const [email, setEmail] = useState("DemoUser@demo.com");
	const [password, setPassword] = useState("password");
	const token = useSelector((state) => state.authentication.token);

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(login({ email, password }));
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};
	const updatePassword = (e) => {
		setPassword(e.target.value);
	};
	if (token) {
		return <Redirect to="/" />;
	}
	return (
		<div className="login">
			<div className="login__brand">
				<span className="login__brand-text">LaMode</span>
			</div>
			<h1 className="login__heading">Sign In</h1>
			<form className="login__form" autoComplete="off" onSubmit={handleSubmit}>
				<div className="form__group">
					<label forhtml="email" className="form__label">
						Email
					</label>
					<input
						className="form__input"
						type="text"
						name="email"
						placeholder="Email"
						value={email}
						onChange={updateEmail}
					/>
				</div>
				<div className="form__group">
					<label forhtml="password" className="form__label">
						Password
					</label>
					<input
						className="form__input"
						type="password"
						name="password"
						placeholder="Password"
						value={password}
						onChange={updatePassword}
					/>
				</div>
				<button className="btn__login">Log in</button>
				<p className="signup">
					You need an account ?
					<span>
						<Link className="signup__link" to="/signup">
							Sign up
						</Link>
					</span>
				</p>
			</form>
		</div>
	);
}
