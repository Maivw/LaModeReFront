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
		<div style={{ backgroundColor: "#eeeeee" }}>
			<Navbar />
			<Link to="/products">
				<button className="shopNow_button">
					<strong>SHOP NOW</strong>
				</button>
			</Link>
			<div className="home__box-carousel">
				<Carousel />
			</div>
			<p className="home__box-colectionText">Collections 2021</p>
			<div className="home__box-colections">
				<Collection />
				<CollectionWinter />
				<CollectionSpring />
			</div>
			<div className="home__box">
				<img
					className="home__box-img"
					src="https://res.cloudinary.com/maivw/image/upload/v1604714491/pexels-konstantin-mishchenko-1926769_b99lis.jpg"
				/>

				{/* <div style={{ width: "90%", alignSelf: "center", marginLeft: "5%" }}>
					<h2
					style={{
						color: "white",
						backgroundColor: "black",
						margiTop: 20,
						padding: 20,
					}}
				>
					Coming soon ...
				</h2>
					<Grid container direction="row" justify="center" alignItems="center">
						<Grid
							className="collections"
							item
							xs={12}
							sm={12}
							md={12}
							lg={12}
							xl={12}
						>
							
						</Grid>
					</Grid>
				</div>
				<Footer /> */}
			</div>
		</div>
	);
}
