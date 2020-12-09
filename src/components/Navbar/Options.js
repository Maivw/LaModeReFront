import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import FaceIcon from "@material-ui/icons/Face";
import { logout } from "../../reducers/authentication";

function Options(props) {
	const { anchorEl, handleClose } = props;
	const dispatch = useDispatch();
	let history = useHistory();

	const onLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		history.push("/login");
		handleClose();
	};
	const onLogin = (e) => {
		handleClose();
		e.preventDefault();
		history.push("/login");
	};

	return (
		<div className="navbar__menu">
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={onLogout} className="navbar__menu-item">
					<ExitToAppIcon
						style={{ color: "rgb(155, 154, 154)", marginRight: "1rem" }}
					/>
					<span style={{ fontSize: "0.8rem", color: "#757575" }}>Log out</span>
				</MenuItem>
				<MenuItem onClick={onLogin} className="navbar__menu-item">
					<PersonAddIcon
						style={{ color: "rgb(155, 154, 154)", marginRight: "1rem" }}
					/>
					<span style={{ fontSize: "0.8rem", color: "#757575" }}>
						Sign in/up
					</span>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<FaceIcon
						style={{ color: "rgb(155, 154, 154)", marginRight: "1rem" }}
					/>
					<a
						style={{
							textDecoration: "none",
						}}
						className="navbar__menu-item"
						className="navbar__about"
						href="https://github.com/Maivw/LaMode-front2"
						target="_blank"
					>
						<span style={{ fontSize: "0.8rem", color: "#757575" }}>About</span>
					</a>
				</MenuItem>
			</Menu>
		</div>
	);
}

export default Options;
