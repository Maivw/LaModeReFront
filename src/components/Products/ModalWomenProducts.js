import React from "react";
import { Link } from "react-router-dom";
import Popover from "@material-ui/core/Popover";

export default function ModalWomenProduct(props) {
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
		<div className="modal">
			<div
				aria-describedby={id}
				variant="contained"
				color="primary"
				onClick={handleClick}
				className="modal__text"
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
				className="popover-navbarModal"
			>
				<div div className="navbarModal navbarModal-women">
					<div className="navbarModal__left">
						<div className="navbarModal__styles">Styles</div>
						<div>
							<Link to="/productlist/dresses" className="navbarModal__style">
								Dress
							</Link>
						</div>
						<div>
							<Link to="/productlist/sleep" className="navbarModal__style">
								Sleep
							</Link>
						</div>
						<div>
							<Link to="/productlist/swimwear" className="navbarModal__style">
								Swimwear
							</Link>
						</div>
						<div>
							<Link to="/productlist/tops" className="navbarModal__style">
								Tops
							</Link>
						</div>
					</div>
					<div className="navbarModal__right">
						<div className="navbarModal__sales">Sales </div>
						<div>
							<Link
								to="/products/promotion/women/10"
								className="navbarModal__sale"
							>
								10%
							</Link>
						</div>
						<div>
							<Link
								to="/products/promotion/women/20"
								className="navbarModal__sale"
							>
								20%
							</Link>
						</div>
						<div>
							<Link
								to="/products/promotion/women/30"
								className="navbarModal__sale"
							>
								30%
							</Link>
						</div>
						<div>
							<Link
								to="/products/promotion/women/50"
								className="navbarModal__sale"
							>
								50%
							</Link>
						</div>
						<div>
							<Link
								to="/products/promotion/women/70"
								className="navbarModal__sale"
							>
								70%
							</Link>
						</div>
					</div>
				</div>
			</Popover>
		</div>
	);
}
