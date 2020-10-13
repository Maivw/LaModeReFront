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

export default function ModalMenProduct(props) {
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
				<span>Men</span>
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
									to="/productlist/graphictee"
									style={{ textDecoration: "none" }}
								>
									<span
										className="textModal"
										style={{ textDecoration: "none" }}
									>
										Graphictee
									</span>
								</Link>
							</div>
							<div>
								<Link
									to="/productlist/bottoms"
									style={{ textDecoration: "none" }}
								>
									<span className="textModal">Bottom</span>
								</Link>
							</div>
							<div>
								<Link
									to="/productlist/jeans & demin"
									style={{ textDecoration: "none" }}
								>
									<span className="textModal">Jeans - Demin</span>
								</Link>
							</div>
							<div>
								<Link
									to="/productlist/hoodies"
									style={{ textDecoration: "none" }}
								>
									<span className="textModal">Hoodies</span>
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
								to="/products/promotion/men/10"
								style={{ textDecoration: "none" }}
							>
								<span className="textModal">10%</span>
							</Link>
						</div>
						<div>
							<Link
								to="/products/promotion/men/20"
								style={{ textDecoration: "none" }}
							>
								<span className="textModal">20%</span>
							</Link>
						</div>
						<div>
							<Link
								to="/products/promotion/men/30"
								style={{ textDecoration: "none" }}
							>
								<span className="textModal">30%</span>
							</Link>
						</div>
						<div>
							<Link
								to="/products/promotion/men/50"
								style={{ textDecoration: "none" }}
							>
								<span className="textModal">50%</span>
							</Link>
						</div>
						<div>
							<Link
								to="/products/promotion/men/70"
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
