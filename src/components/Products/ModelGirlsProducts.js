import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import "./modal.css";

const useStyles = makeStyles((theme) => ({
	typograhy: {
		padding: theme.spacing(2),
		backgroundColor: "#e0e0e0",
		width: 300,
		alignItems: "center",
	},
}));
export default function ModalGirlsProduct(props) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	return (
		<div className="navbar--modal">
			<div
				aria-describedby={id}
				variant="contained"
				color="primary"
				onClick={handleClick}
			>
				<span>Girls</span>
			</div>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
			>
				<div className="navbar--modal">
					<div className={classes.typograhy}>
						<div className="colModalRight">
							<span className="textModal">
								<strong>Styles</strong>
							</span>
							<Link
								to="/productlist/swearshirt"
								style={{ textDecoration: "none" }}
							>
								<div>
									<span className="textModal">Swearshirts</span>
								</div>
							</Link>
							<Link
								to="/productlist/kid-dresses"
								style={{ textDecoration: "none" }}
							>
								<div>
									<span className="textModal">Kid-Dress</span>
								</div>
							</Link>
						</div>
					</div>
					<div className={classes.typograhy}>
						<div>
							<span className="textModal">
								<strong>Sales</strong>
							</span>
							<Link
								to="/products/promotion/girls/10"
								style={{ textDecoration: "none" }}
							>
								<div>
									<span className="textModal">10%</span>
								</div>
							</Link>

							<Link
								to="/products/promotion/girls/20"
								style={{ textDecoration: "none" }}
							>
								<div>
									<span className="textModal">20%</span>
								</div>
							</Link>

							<Link
								to="/products/promotion/girls/30"
								style={{ textDecoration: "none" }}
							>
								<div>
									<span className="textModal">30%</span>
								</div>
							</Link>
							<Link
								to="/products/promotion/girls/50"
								style={{ textDecoration: "none" }}
							>
								<div>
									<span className="textModal">50%</span>
								</div>
							</Link>
							<Link
								to="/products/promotion/girls/70"
								style={{ textDecoration: "none" }}
							>
								<div>
									<span className="textModal">70%</span>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</Popover>
		</div>
	);
}
