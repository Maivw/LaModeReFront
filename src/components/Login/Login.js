import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/authentication";
import "./Login.css";
import { Link, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

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
	const classes = useStyles();
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
		<Grid container spacing={3} className="login_page">
			<Grid item xs={12} sm={6}>
				<form className="login-form" onSubmit={handleSubmit}>
					<h4>We are La_Mode</h4>
					<p>
						Welcome back! Log in to your account
						<br></br>
						to view our trending items.
					</p>

					<input
						className="in-form-field"
						type="text"
						name="email"
						placeholder="Email"
						value={email}
						onChange={updateEmail}
					/>

					<input
						className="in-form-field"
						type="password"
						name="password"
						placeholder="Password"
						value={password}
						onChange={updatePassword}
					/>
					<button className="btn_login">LOG IN</button>

					<h3>
						You need an account?
						<span>
							<Link
								style={{
									textDecoration: "none",
									color: "white",
									marginLeft: 10,
								}}
								className="sign-up"
								to="/signup"
							>
								SIGNUP
							</Link>
						</span>
					</h3>
				</form>
			</Grid>
		</Grid>
	);
}
