import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
// import div from "@material-ui/core/div";
import "./modal.css";

const useStyles = makeStyles((theme) => ({
	typography: {
		padding: theme.spacing(2),
		backgroundColor: "#e0e0e0",
		width: 300,
		alignItems: "center",
	},
}));

export default function ModalWomenProduct(props) {
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
				Women
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
					<div className={classes.typography}>
						<div className="colModalRight">
							<strong>
								<span className="textModal">Styles</span>
							</strong>
							<div>
								<Link
									to="/productlist/dresses"
									style={{ textDecoration: "none" }}
								>
									<span className="textModal">Dress</span>
								</Link>
							</div>
							<div>
								<Link
									to="/productlist/sleep"
									style={{ textDecoration: "none" }}
								>
									<span className="textModal">Sleep</span>
								</Link>
							</div>
							<div>
								<Link
									to="/productlist/swimwear"
									style={{ textDecoration: "none" }}
								>
									<span className="textModal">Swimwear</span>
								</Link>
							</div>
							<div>
								<Link to="/productlist/tops" style={{ textDecoration: "none" }}>
									<span className="textModal">Tops</span>
								</Link>
							</div>
						</div>
					</div>
					<div className={classes.typography}>
						<strong>
							<span className="textModal">Sales</span>
						</strong>
						<div>
							<Link
								to="/products/promotion/women/10"
								style={{ textDecoration: "none" }}
							>
								<span className="textModal">10%</span>
							</Link>
						</div>
						<div>
							<Link
								to="/products/promotion/women/20"
								style={{ textDecoration: "none" }}
							>
								<span className="textModal">20%</span>
							</Link>
						</div>
						<div>
							<Link
								to="/products/promotion/women/30"
								style={{ textDecoration: "none" }}
							>
								<span className="textModal">30%</span>
							</Link>
						</div>
						<div>
							<Link
								to="/products/promotion/women/50"
								style={{ textDecoration: "none" }}
							>
								<span className="textModal">50%</span>
							</Link>
						</div>
						<div>
							<Link
								to="/products/promotion/women/70"
								style={{ textDecoration: "none" }}
							>
								<span className="textModal">70%</span>
							</Link>
						</div>
					</div>
				</div>
			</Popover>
		</div>
	);
}
