import React from "react";
import "./Home.css";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Collection from "./CollectionFall";
import CollectionWinter from "./CollectionWinter";
import CollectionSpring from "./CollectionSpring";
import Button from "@material-ui/core/Button";
import Footer from "./Footer";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
	left: {
		backgroundColor: "red",
	},
}));

export default function Home(props) {
	const classes = useStyles();
	return (
		<div
			style={{
				backgroundColor: "#eeeeee",
				margin: 0,
				padding: 0,
				boxSizing: "border-box",
			}}
		>
			<Navbar />
			<Link to="/products">
				<Button className="btn__shopnow">
					<span style={{ textTransform: "uppercase" }}>S</span>
					hop now
				</Button>
			</Link>
			<div className="home__box-carousel">
				<Carousel />
			</div>

			<div className="home__box">
				<img
					className="home__box-img"
					src="https://res.cloudinary.com/maivw/image/upload/v1604714491/pexels-konstantin-mishchenko-1926769_b99lis.jpg"
				/>
			</div>
			<div className="center">
				<p className="home__box-colectionText">Coming soon ...</p>
				<div className="home__box-colections">
					<Collection />
					<CollectionWinter />
					<CollectionSpring />
				</div>
				<div className="home__box--footer">
					<Footer />
				</div>
			</div>
		</div>
	);
}
