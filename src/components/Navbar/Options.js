import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { logout } from "../../reducers/authentication";
import "./navbar.css";
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
		<div>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={onLogout} style={{ fontSize: 12, color: "#424242" }}>
					<ExitToAppIcon />
					Log out
				</MenuItem>
				<MenuItem onClick={onLogin} style={{ fontSize: 12, color: "#424242" }}>
					<PersonAddIcon />
					<span>Sign in/up</span>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<a
						style={{ fontSize: 12, color: "#424242", textDecoration: "none" }}
						className="navbar__about"
						href="https://github.com/Maivw/LaMode-front2"
						target="_blank"
					>
						About
					</a>
				</MenuItem>
			</Menu>
		</div>
	);
}

export default Options;
