import React from "react";
import "./Home.css";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Collection from "./CollectionFall";
import CollectionWinter from "./CollectionWinter";
import CollectionSpring from "./CollectionSpring";
import Grid from "@material-ui/core/Grid";
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
				<button className="shopNow_button">
					<strong>SHOP NOW</strong>
				</button>
			</Link>
			<div className="home__box-carousel">
				<Carousel />
			</div>
			<p className="home__box-colectionText">Coming soon ...</p>
			<div className="home__box-colections">
				<Collection />
				<CollectionWinter />
				<CollectionSpring />
			</div>
			<Footer />
			<div className="home__box">
				<img
					className="home__box-img"
					src="https://res.cloudinary.com/maivw/image/upload/v1604714491/pexels-konstantin-mishchenko-1926769_b99lis.jpg"
				/>
			</div>
		</div>
	);
}
