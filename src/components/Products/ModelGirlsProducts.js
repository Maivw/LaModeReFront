import React from "react";
import { Link } from "react-router-dom";
import Popover from "@material-ui/core/Popover";

export default function ModalGirlsProduct(props) {
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
		<div div className="modal">
			<div
				aria-describedby={id}
				variant="contained"
				color="primary"
				onClick={handleClick}
				className="modal__text"
			>
				Girls
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
				<div div className="navbarModal navbarModal-girl">
					<div className="navbarModal__left">
						<div className="navbarModal__styles">Styles</div>
						<div>
							<Link to="/productlist/swearshirt" className="navbarModal__style">
								Swearshirts
							</Link>
						</div>

						<div>
							<Link
								to="/productlist/kid-dresses"
								className="navbarModal__style"
							>
								Kid-Dress
							</Link>
						</div>
					</div>
					<div className="navbarModal__right">
						<div className="navbarModal__sales">Sales </div>
						<div>
							<Link
								to="/products/promotion/girls/10"
								className="navbarModal__sale"
							>
								10%
							</Link>
						</div>
						<div>
							<Link
								to="/products/promotion/girls/20"
								className="navbarModal__sale"
							>
								20%
							</Link>
						</div>
						<div>
							<Link
								to="/products/promotion/girls/30"
								className="navbarModal__sale"
							>
								30%
							</Link>
						</div>
						<div>
							<Link
								to="/products/promotion/girls/50"
								className="navbarModal__sale"
							>
								50%
							</Link>
						</div>
						<div>
							<Link
								to="/products/promotion/girls/70"
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
