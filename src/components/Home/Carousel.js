import React from "react";
import Slider from "react-slick";
import { Link, useHistory } from "react-router-dom";
import "./Carousel.css";

export default function Carousel() {
	const history = useHistory();
	const showWomenDresses = () => {
		history.push("/productlist/dresses");
	};
	const showWomenLingerie = () => {
		history.push("/productlist/lingerie");
	};
	const showGirlsSwearshirt = () => {
		history.push("/productlist/swearshirt");
	};
	const showGirlDresses = () => {
		history.push("/productlist/kid-dresses");
	};
	const showGirlTops = () => {
		history.push("/productlist/tops");
	};
	const showMenTShirt = () => {
		history.push("/productlist/graphictee");
	};
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: 0,
					dots: true,
				},
			},
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 780,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<div>
			<Slider {...settings}>
				<div className="carousel__image" onClick={showWomenDresses}>
					<img src="https://res.cloudinary.com/maivw/image/upload/v1601430866/LamodeWomenDress_jgdx0d.jpg" />
				</div>
				<div className="carousel__image" onClick={showMenTShirt}>
					<img src="https://res.cloudinary.com/maivw/image/upload/v1601430867/LamodeMen_blats8.jpg" />
				</div>

				<div className="carousel__image" onClick={showWomenLingerie}>
					<img src="https://res.cloudinary.com/maivw/image/upload/v1601430866/LaModeWomeLingerie_het75e.jpg" />
				</div>
				<div className="carousel__image" onClick={showGirlsSwearshirt}>
					<img src="https://images.pexels.com/photos/35188/child-childrens-baby-children-s.jpg?cs=srgb&dl=pexels-bess-hamiti-35188.jpg&fm=jpg" />
				</div>
				<div className="carousel__image" onClick={showGirlDresses}>
					<img src="https://images.pexels.com/photos/4711724/pexels-photo-4711724.jpeg?cs=srgb&dl=pexels-cottonbro-4711724.jpg&fm=jpg" />
				</div>
				<div className="carousel__image" onClick={showGirlTops}>
					<img src="https://afamilycdn.com/2017/img20170906143707368.jpg" />
				</div>
			</Slider>
		</div>
	);
}
