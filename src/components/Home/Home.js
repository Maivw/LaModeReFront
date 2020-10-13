import React from "react";
import "./Home.css";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Collection from "./CollectionFall";
import CollectionWinter from "./CollectionWinter";
import CollectionSpring from "./CollectionSpring";
import Grid from "@material-ui/core/Grid";

export default function Home(props) {
	return (
		<div className="home__box">
			<Navbar />
			<Link to="/products">
				<button className="shopNow_button">
					<strong>SHOP NOW</strong>
				</button>
			</Link>
			<div
				style={{
					paddingBottom: 15,
					width: "90%",
					alignSelf: "center",
					marginLeft: "5%",
				}}
			>
				<Carousel />
			</div>

			<div style={{ width: "90%", alignSelf: "center", marginLeft: "5%" }}>
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
						<Collection />
						<CollectionWinter />
						<CollectionSpring />
					</Grid>
				</Grid>
			</div>
		</div>
	);
}
