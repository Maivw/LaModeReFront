import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { logout } from "../../reducers/authentication";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ModalWomenProduct from "../Products/ModalWomenProducts";
import ModalMenProduct from "../Products/ModalMenProducts";
import ModalGirlsProduct from "../Products/ModelGirlsProducts";
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Options from "./Options";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));
const StyledBadge = withStyles((theme) => ({
	badge: {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: "0 4px",
	},
}))(Badge);
export default function Navbar(props) {
	const token = useSelector((state) => state.authentication.token);
	const products = useSelector((state) => state.cartManagement.products);
	const classes = useStyles();
	const dispatch = useDispatch();
	let history = useHistory();

	const onBackHomePage = (e) => {
		e.preventDefault();
		history.push("/");
	};
	const onShowProducts = (e) => {
		e.preventDefault();
		history.push("/products");
	};

	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<div className={classes.root} className="navbar">
				<Grid container direction="row" justify="center" alignItems="center">
					<Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
						<div className="navbar__logo">
							<a href="https://maivw.github.io/" target="_blank">
								<img
									className="navbar__logo-image"
									src="https://res.cloudinary.com/maivw/image/upload/v1600572380/Lamode/LamModeLogo_mifxuv.png"
									alt="LaModeLogo"
								/>
							</a>
						</div>
					</Grid>
					<Grid
						item
						xs={6}
						sm={6}
						md={6}
						lg={6}
						xl={6}
						className="navbar__middle"
					>
						<div
							className="navbar__middle-brandName"
							onClick={(e) => onBackHomePage(e)}
						>
							LaMode
						</div>
						<div className="navbar__middle-categories">
							<div>
								<ModalWomenProduct />
							</div>
							<div>
								<ModalMenProduct />
							</div>
							<div>
								<ModalGirlsProduct />
							</div>
							<div
								className="navbar__middle-allproducts"
								onClick={(e) => onShowProducts(e)}
							>
								All Products
							</div>
						</div>
					</Grid>
					<Grid
						item
						xs={2}
						sm={2}
						md={2}
						lg={2}
						xl={2}
						className="navbar__right"
					>
						<div className="navbar__right-icons">
							<div>
								<Link to="/favorite">
									<Badge color="secondary" variant="dot">
										<FavoriteIcon className="navbar__right-icon" />
									</Badge>
								</Link>
							</div>
							<div>
								<Link to="/cart">
									<StyledBadge badgeContent={products.length} color="secondary">
										<LocalMallIcon className="navbar__right-icon" />
									</StyledBadge>
								</Link>
							</div>
							<div className="navbar__right-icon">
								<AccountCircleIcon
									onClick={handleClick}
									className="navbar__right-icon"
								/>
								<Options anchorEl={anchorEl} handleClose={handleClose} />
							</div>
						</div>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}
